Discord = require('discord.js'),
reactions = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
 
module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const [question, ...choices] = args.join(' ').split(' | ')
            if (!question) return message.channel.send('Veuillez indiquer la question à poser <a:rondattention:821430546961399838>')
            if (!choices.length) return message.channel.send('Veuillez indiquer au moins 1 choix <a:rondattention:821430546961399838>')
            if (choices.length > 20) return message.channel.send('Il ne peut pas y avoir plus de 20 choix <a:rondattention:821430546961399838>')
            message.delete()
            const sent = await message.channel.send(new Discord.MessageEmbed()
                .setTitle(question)
                .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')))
            for (i = 0; i < choices.length; i++) await sent.react(reactions[i])
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande sondage \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _sondage_ :\n   "+e);
        }
    },
    name: 'sondage',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de créer un sondage.',
        syntax: '<question> | <choix> [|] [choix]'
    }
}