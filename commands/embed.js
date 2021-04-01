const Discord = require("discord.js");
const config = require('../config.json')
 
module.exports = {
    run: (message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer.')
        message.delete()
        message.channel.send(new Discord.MessageEmbed().setDescription(message.content.trim().slice(`${config.prefix}embed`.length)))
    },
    name: 'embed',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de créer un message dans un embed.',
        syntax: '<message>'
    }
}
    