
//         // try{
//             if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:819914483190726688>')
//             const member = message.mentions.members.first()
//             if (!member) return message.channel.send('Veuillez mentionner le membre dont vous voulez voir les warns <a:rondattention:819914483190726688>')
//             if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn <a:rondattention:819914483190726688>')
//             message.channel.send(new Discord.MessageEmbed()
//                 .setDescription(`${client.db.warns[member.id].slice(0, 30).map((warn, i) => `**${i + 1}.** __Raison :__ ${warn.reason}\n${moment(warn.date).fromNow()} par <@!${warn.modo}>`).join('\n\n')}\n\n**Total de warns :** ${client.db.warns[member.id].length}`))
//             message.delete();
//         // }catch(e){
//         //     console.log("Erreur lors de l\'éxecution de la commande checkwarn \n   "+e)
//         //     message.guild.channels.cache.get('842681101452705833').send("Erreur lors de l\'éxecution de la commande _checkwarn_ :\n   "+e);
//         // } 
//     },
//     name: 'checkwarn',
//     guildOnly: true,
//     help: {
//         description: 'Cette commande permet de vérifier les warns d\'une personne.',
//         syntax: '[@membre]'
//     }
// }

const moment = require('moment'),
    Discord = require('discord.js')
 
moment.locale('fr')
 
module.exports = {
    run: async (message, args, client) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre dont vous voulez voir les warns <a:rondattention:821430546961399838>')
            if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn <a:rondattention:821430546961399838>')
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**Total de warns :** ${client.db.warns[member.id].length}\n__**warns :**__\n\n${client.db.warns[member.id].slice(0, 30).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.modo}>`).join('\n')}`))
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande checkwarn \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _checkwarn_ :\n   "+e);
        } 
    },
    name: 'checkwarn',
    guildOnly: true,
    help: {
       description: 'Cette commande permet de vérifier les warns d\'une personne.',
       syntax: '[@membre]'
    }
}