// Discord = require('discord.js'),
// config = require('../config.json')
 
// module.exports = {
//     run: async (message, args) => {
//         if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
//         if (!args[0]) return message.channel.send('Veuillez indiquer l\'id du message a modifier');
//         if (!args[1]) return message.channel.send('Veuillez indiquer le contenu du message à modifier');
//         messageAmodif = args[0]
//         // client.channels.cache.get(channelid).fetchMessage(messageAmodif).edit(args[1])
//         // message.channel.edit(args[1]);
//         messageAmodif.edit(args[1])
//         message.delete()
//     // }catch(e){
//     //     console.log("Erreur lors de l\'éxecution de la commande embed \n   "+e)
//     //     message.guild.channels.cache.get('842681101452705833').send("Erreur lors de l\'éxecution de la commande _embed_ :\n   "+e);
//     // }
//     },
//     name: 'editembed',
//     guildOnly: true
// }

// // .fetchMessage(args[0])
