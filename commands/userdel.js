module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        let user = message.guild.member(message.mentions.users.first());
        if (!user) return message.reply('Veuillez mentionner un membre')
        if(isNaN(args[1])||(args[1]<1 || args[1]>100))return message.reply("Veuillez indiquer un nombre entre 0 et 100 !");

        const messages = (await message.channel.messages.fetch({
            limit: 100,
            before: message.id,
        })).filter(a=>a.author.id===user.id).array();

        messages.length = Math.min(args[1], messages.length);
        if(messages.length === 0 || !user)return message.reply("Utilisateur inéxistant ou il n'a envoyé aucun message.")
        if(messages.length === 1) await messages[0].delete();
        else await message.channel.bulkDelete(messages);


        if(messages.length === 1) return message.channel.send(`${messages.length} messages de ${message.mentions.users.first()} a été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
        else message.channel.send(`${messages.length} messages de ${message.mentions.users.first()} ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'userdel',
    guildOnly: true,
}