module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
        message.delete();
        message.channel.send(`${message.member} ne prend plus en charge le ticket <a:rondattention:819914483190726688>`)
    },
    name: 'moi',
    guildOnly: true
}