Discord = require("discord.js"),
config = require('../config.json')
 
module.exports = {
    run: (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            if (!args[0]) return message.channel.send('Veuillez indiquer du texte à envoyer <a:rondattention:821430546961399838>')
            message.delete()
            message.channel.send(new Discord.MessageEmbed().setDescription(message.content.trim().slice(`${config.prefix}embed`.length)))
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande embed \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _embed_ :\n   "+e);
        }
    },
    name: 'embed',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de créer un message dans un embed.',
        syntax: '<message>'
    }
}