module.exports = {
    run: async (message) => {
        try{
            if(message.author.id != '552536895373180979') return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            await message.channel.send("shutdown effectué <a:avis_2_2:821430548554711050>")
            await message.delete()
            process.exit()
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande shutdown \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _shutdown_ :\n   "+e);
        }
    },
    name: 'shutdown',
    help: {
        description: 'Cette commande permet d\'éteindre le bot.'
    }
}