const Commando = require('discord.js-commando')

module.exports = {
    run: (message, args) => {
        try{
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const { channel } = message 
            let duration = args.shift()
            if(duration === 'off'){duration = 0}
            if(isNaN(duration)) return message.reply('Veuillez indiqué une valeur valide <a:rondattention:821430546961399838>')
            channel.setRateLimitPerUser(duration)
            message.reply(`slowmode fixé a ${duration} <a:avis_2_2:821430548554711050>`)
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande slowmode \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _slowmode_ :\n   "+e);
        }
    },
    name: 'slowmode',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'jouter un slowmode sur un channel.',
        syntax: '<temps>'
    }
}

