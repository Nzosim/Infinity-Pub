const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration'),
    fs = require('fs')
    Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args, client) => {
        try{
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande <a:rondattention:821430546961399838>')
            const member = message.mentions.members.first()
            if (!member) return message.channel.send('Veuillez mentionner le membre à warn <a:rondattention:821430546961399838>')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur <a:rondattention:821430546961399838>')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre <a:rondattention:821430546961399838>')
            const reason = args.slice(1).join(' ')
            if (!reason) return message.channel.send('Veuillez indiquer une raison <a:rondattention:821430546961399838>')
            if (!client.db.warns[member.id]) client.db.warns[member.id] = []
            client.db.warns[member.id].unshift({
                reason,
                date: Date.now(),
                modo: message.author.id
            })
            fs.writeFileSync('./db.json', JSON.stringify(client.db))
            message.channel.send(new Discord.MessageEmbed().setAuthor(`${member.user.tag} a été warn <a:avis_2_2:821430548554711050>`, member.user.displayAvatarURL())
                .setDescription(`**Raison : **${reason}`)).then(sent => sent.delete({timeout: 5e3}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Salon', message.channel, true))
            member.send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] Vous avez été warn sur Infinity Pub`, member.user.displayAvatarURL())
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Salon', message.channel, true)
            .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
            message.delete();
            if(client.db.warns[member.id].length === 3){
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
                        const duration = parseDuration("1d")
                        const reason = "Trop d'infraction"
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
            }


            if(client.db.warns[member.id].length === 6){
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
                        const duration = parseDuration("5d")
                        const reason = "Trop d'infraction"
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
            }

            if(client.db.warns[member.id].length === 10){
                const reason = "Trop d'infraction"
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
            message.channel.send(`${member} a été mute <a:avis_2_2:821430548554711050>`).then(sent => sent.delete({timeout: 5e3}))
            message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
                .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Durée', '∞', true))
            member.send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] Vous avez été mute sur Infinity Pub`, member.user.displayAvatarURL())
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', '∞', true)
            .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
            }
        }catch(e){
            console.log("Erreur lors de l\'éxecution de la commande warn \n   "+e)
            message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _warn_ :\n   "+e);
        }
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de donner un avertissement à un membre.',
        syntax: '<@membre> <raison>'
    }
}