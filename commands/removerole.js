Discord = require('discord.js')

module.exports = {
    run: async (message) => {
        try{
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first() 
            if(!member) return message.channel.send('Vous devez mentionner un membre <a:rondattention:821430546961399838>') 
            const role = message.mentions.roles.first()
            if(!role) return message.channel.send('Vous devez mentionner un rôle <a:rondattention:821430546961399838>') 
            await member.roles.remove(role) 
            message.channel.send(`Le rôle ${role} a été retiré à ${member} <a:avis_2_2:821430548554711050>`) 
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande removerole \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _removerole_ :\n   "+e);
        }
    },
    name: 'removerole',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de nettoyer un channel.',
        syntax: '<@membre> <@rôle>'
    }
}
    