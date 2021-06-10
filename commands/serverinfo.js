Discord = require('discord.js'),
    moment = require('moment')
 
module.exports = {
    run: (message) => {
        try{
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            message.channel.send(new Discord.MessageEmbed()
                .addField('Nom', message.guild.name, true)
                .addField('Région', message.guild.region, true)
                .addField('Membres', `${message.guild.memberCount} membres\n${message.guild.members.cache.filter(member => !member.user.bot).size} humains\n${message.guild.members.cache.filter(member => member.user.bot).size} bots`, true)
                .addField('Salons', `${message.guild.channels.cache.size} salons\n${message.guild.channels.cache.filter(channel => channel.type === 'text').size} salons textuels\n${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} salons vocaux\n${message.guild.channels.cache.filter(channel => channel.type === 'category').size} catégories`, true)
                .addField('Emojis', `${message.guild.emojis.cache.size} emojis\n${message.guild.emojis.cache.filter(emoji => !emoji.animated).size} emojis statiques\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size} emojis animés`, true)
                .addField('Rôles', message.guild.roles.cache.size, true)
                .addField('Propriétaire', message.guild.owner, true)
                .addField('Date de création', moment(message.guild.createdAt).format('[Le] DD/MM/YYYY [à] HH:mm:ss'), true)
                .addField('Nitro boost', `Tier : ${message.guild.premiumTier}\nNombre de boosts : ${message.guild.premiumSubscriptionCount}`, true)
                .setFooter(`ID : ${message.guild.id}`)
                .setThumbnail(message.guild.iconURL())
                .setImage(message.guild.bannerURL()))
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande serverinfo \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _serverinfo_ :\n   "+e);
        }
    },
    name: 'serverinfo',
    guildOnly: true
}