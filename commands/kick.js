Discord = require('discord.js'),
config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à exclure <a:rondattention:821430546961399838>')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure le propriétaire du serveur <a:rondattention:821430546961399838>')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure ce membre <a:rondattention:821430546961399838>')
            if (!member.kickable) return message.channel.send('Le bot ne peut pas exclure ce membre <a:rondattention:821430546961399838>')
            const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
            await member.kick(reason)
            message.channel.send(`${member.user.tag} a été exclu <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5000}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[KICK] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true))
            message.delete()
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande kick \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _kick_ :\n   "+e);
        }
    },
    name: 'kick',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de kick un membre du serveur.',
        syntax: '<@membre> [raison]'
    }
}