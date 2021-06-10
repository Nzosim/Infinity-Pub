module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const count = args[0]
            if (!/\d+/.test(count)) return message.channel.send('Veuillez indiquer un nombre de messages à supprimer <a:rondattention:821430546961399838>')
            if (count < 1 || count > 99) return message.channel.send('Le nombre de message doit être compris entre 1 et 99 <a:rondattention:821430546961399838>')
            const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
            message.channel.send(`${size - 1} messages ont été supprimés <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5e3}))
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande clear \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _clear_ :\n   "+e);
        }
    },
    name: 'clear',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de supprimer un nombre de message défini.',
        syntax: '<nombre>'
    }
}