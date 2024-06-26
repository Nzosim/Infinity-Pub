const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à mute <a:rondattention:821430546961399838>')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mute le propriétaire du serveur <a:rondattention:821430546961399838>')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre <a:rondattention:821430546961399838>')
            if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre <a:rondattention:821430546961399838>')
            const duration = parseDuration(args[1])
            if (!duration) return message.channel.send('Veuillez indiquer une durée valide <a:rondattention:821430546961399838>')
            const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
            if (!muteRole) {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: 0
                    }
                })
                message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false
                }))
            }
            await member.roles.add(muteRole)
            message.channel.send(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5e3}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true))
            setTimeout(() => {
                if (member.deleted || !member.manageable) return
                member.roles.remove(muteRole)
                message.channel.send(`${member} a été unmute <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5e3}))
            }, duration)
            member.send(new Discord.MessageEmbed()
                .setAuthor(`[MUTE] Vous avez été mute sur Infinity Pub`, member.user.displayAvatarURL())
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
                .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
            message.delete();
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande tempmute \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _tempmute_ :\n   "+e);
        }
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de mute un membre du serveur pendant une durée déterminé.',
        syntax: '<@membre> <temp> [raison]'
    }
}