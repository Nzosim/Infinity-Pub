module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
        message.delete();
        message.channel.send(`${message.member} prend en charge le ticket <a:avis_2_2:821430548554711050>`)
    },
    name: 'moi',
    guildOnly: true
}