const { DiscordAPIError } = require("discord.js")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const { size } = await message.channel.bulkDelete(100, true)
        message.channel.send(new Discord.MessageEmbed().setDescription(`Le channel a été nettoyé par ${message.author}`).setTimestamp())
    },
    name: 'nettoy',
    guildOnly: true,
}