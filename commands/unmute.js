Discord = require('discord.js'),
config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à unmute <a:rondattention:821430546961399838>')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez unmute le propriétaire du serveur <a:rondattention:821430546961399838>')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre <a:rondattention:821430546961399838>')
            if (!member.manageable) return message.channel.send('Le bot ne peut pas unmute ce membre <a:rondattention:821430546961399838>')
            const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
            const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
            if (!muteRole) return message.channel.send('Il n\'y a pas de muterole <a:rondattention:821430546961399838>')
            await member.roles.remove(muteRole)
            message.channel.send(`${member} a été unmute <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5e3}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true))
            member.send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] Vous avez été unmute sur Infinity Pub`, member.user.displayAvatarURL())
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
            message.delete();
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande unmute \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _unmute_ :\n   "+e);
        }
    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unmute un membre.',
        syntax: '<@membre> [raison]'
    }
}