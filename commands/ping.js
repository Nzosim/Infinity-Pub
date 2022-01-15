Discord = require("discord.js")

module.exports = {
    run: async (message, client) => {
        try{
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
            message.channel.send('Loading data').then (async (msg) =>{
                msg.delete()
                message.channel.send(`🏓 Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. Api: ${client.ws.ping}ms`);
                message.delete();
            })
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande ping \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _ping_ :\n   "+e);
        }
    },
    name: 'ping',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de connaitre le ping du bot.'
    }
}