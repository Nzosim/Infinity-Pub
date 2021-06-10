const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à bannir <a:rondattention:821430546961399838>')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur <a:rondattention:821430546961399838>')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre <a:rondattention:821430546961399838>')
            if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre <a:rondattention:821430546961399838>')
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send('Veuillez indiquer une durée valide <a:rondattention:821430546961399838>')
            const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
            await member.ban({reason})
            message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5000}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true))
            setTimeout(() => {
                message.guild.members.unban(member)
                message.channel.send(`${member.user.tag} a été débanni <a:avis_2_2:810958454810083358>`).then(sent => sent.delete({timeout: 5e3}))
            }, duration)
            message.delete()
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande tempban \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _tempban_ :\n   "+e);
        }
    },
    name: 'tempban',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de ban un membre du serveur pendant une durée déterminé.',
        syntax: '<@membre> <temp> [raison]'
    }
}