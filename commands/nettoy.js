Discord = require("discord.js")

module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            await message.channel.bulkDelete(100, true)
            message.channel.send(new Discord.MessageEmbed()
                .setDescription(`Le channel a été nettoyé par ${message.author} <a:avis_2_2:821430548554711050>`)
                .setTimestamp())
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande nettoy \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _nettoy_ :\n   "+e);
        }
    },
    name: 'nettoy',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de nettoyer un channel.'
    }
}