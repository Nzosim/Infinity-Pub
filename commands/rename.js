// const Discord = require("discord.js")
 
// module.exports = {
//     run: (message, args) => {
//         let idchannel = args.slice(1) || 'Aucun channel indiqué'
//         let nouveauNom = args.slice(2) || 'Aucun nom indiqué'
//         message.guild.channels.cache.id(idchannel).setName(nouveauNom)
//         message.delete()
//     },
//     name: 'rename',
//     guildOnly: true,
//     help: {
//         description: '',
//         syntax: '<message>'
//     }
// }
 
//         // const member = message.mentions.members.first()
        // if (!member) return message.channel.send('Veuillez mentionner le membre à bannir.')
        // if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')
        // if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
        // if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')
        // const duration = parseDuration(args[1])
        // if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        // const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        // await member.ban({reason})
        // message.channel.send(`${member.user.tag} a été banni pendant ${humanizeDuration(duration, {language: 'fr'})} !`).then(sent => sent.delete({timeout: 5e3}))
        // message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
        //     .setAuthor(`[BAN] ${member.user.tag}`, member.user.displayAvatarURL())
        //     .addField('Utilisateur', member, true)
        //     .addField('Modérateur', message.author, true)
        //     .addField('Raison', reason, true)
        //     .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true))
        // setTimeout(() => {
        //     message.guild.members.unban(member)
        //     message.channel.send(`${member.user.tag} a été débanni.`).then(sent => sent.delete({timeout: 5e3}))
        // }, duration)
 