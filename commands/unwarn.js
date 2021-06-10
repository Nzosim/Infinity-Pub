const fs = require('fs')

module.exports = {
    run: async (message, args, client) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn <a:rondattention:821430546961399838>')
            if (!client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn <a:rondattention:821430546961399838>')
            const warnIndex = parseInt(args[1], 10) - 1
            if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('Veuillez indiquer un warn valide a retirer <a:rondattention:821430546961399838>')
            const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
            if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
            fs.writeFileSync('./db.json', JSON.stringify(client.db))
            message.channel.send(`${member} a été unwarn <a:avis_2_2:821430548554711050>`)
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande unwarn \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _unwarn_ :\n   "+e);
        }
    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de unwarn un membre.',
        syntax: '<@membre>'
    }
}