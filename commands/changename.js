Discord = require('discord.js'),
config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const chan = args[0];
        if (chan != 1 && chan != 2) return message.channel.send('Veuillez indiquer un channel valide');
        const newName = args[1];
        if(!newName) return message.channel.send('Veuillez indiquer un nouveau nom pour le channel')
        if(chan == 1){
            message.guild.channels.cache.get("817749800266104876").setName(newName);
            message.channel.send('Channel 1 modifié');
        }else if(chan == 2){
            message.guild.channels.cache.get("817749815445159947").setName(newName);
            message.channel.send('Channel 2 modifié');
        }else{console.log('oh')}
    },
    name: 'changename',
    guildOnly: true,
}