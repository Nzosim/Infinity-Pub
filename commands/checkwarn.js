const moment = require('moment'),
    Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre dont vous voulez voir les warns.')
        if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn.')
        message.channel.send(new Discord.MessageEmbed()
            .setDescription(`${client.db.warns[member.id].slice(0, 30).map((warn, i) => `**${i + 1}.** __Raison :__ ${warn.reason}\n${moment(warn.date).fromNow()} par <@!${warn.modo}>`).join('\n\n')}\n\n**Total de warns :** ${client.db.warns[member.id].length}`))
    message.delete();
    },
    name: 'checkwarn',
    guildOnly: true
}