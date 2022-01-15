module.exports = {
    run: async (message) => {
        try{
            if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const membre = message.mentions.members.first() 
            if(!membre) return message.channel.send('Vous devez mentionner un membre <a:rondattention:821430546961399838>')
            const role = message.mentions.roles.first() 
            if(!role) return message.channel.send('Vous devez mentionner un rôle <a:rondattention:821430546961399838>') 
            await membre.roles.add(role)
            message.channel.send(`${membre} a obtenue le rôle ${role} <a:avis_2_2:821430548554711050>`)
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande addrole \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _addrole_ :\n   "+e);
        }
    },
    name: 'addrole',
    guildOnly: true,
    help: {
        description: 'Cette commande permet d\'ajouter un rôle à une personne.',
        syntax: '<@membre> <@rôle>'
    }
}  