const Discord = require("discord.js");

module.exports.run = async (client, message, args) => { 

        const embed1 = new Discord.MessageEmbed()
        .setTitle("<a:chargement:808104828022685696> Chargement du Constructeur D'embed !")
        .setDescription(`**Nous chargons l'embed qui vous permettra de créer votre embed à vous !**`)
        .setFooter("Delta",client.user.avatarURL())
        .setColor("#2f3136")
        let msg = await message.channel.send(embed1)

        const embedbase = new Discord.MessageEmbed()

        let msgg = await message.channel.send(embedbase)

        const embed = new Discord.MessageEmbed()

        embed.setTitle("<a:logs:801767919230910474> Menu de la Création de L'embed !")
        embed.setDescription("**Veuillez cliquer sur les réactions en dessous de l'embed selon ce qui vous correspond à mettre dans votre embed.**")
        embed.setTimestamp()
        embed.setColor(`#2f3136`)
        embed.setFooter("Delta",client.user.avatarURL())

        embed.addFields(
            { name: '✏️', value: '\`・Modifier le titre\`', inline: true },
            { name: '📝', value: '\`・Modifier la description\`', inline: true },
            { name: '🗣', value: '\`・Modifier l\'auteur\`', inline: true },
            { name: '🖍', value: '\`・Modifier le footer\`', inline: true },
            { name: '💶', value: '\`・Modifier la miniature\`', inline: true },
            { name: '🖼', value: '\`・Modifier l\'image\`', inline: true },
            { name: '🌐', value: '\`・Modifier l\'URL\`', inline: true },
            { name: '🎨', value: '\`・Modifier la couleur\`', inline: true },
            { name: '⏲', value: '\`・Modifier le timestamp\`', inline: true },
            { name: '❌', value: '\`・Annuler l\'embed\`', inline: true },
            { name: '✅', value: '\`・Envoyer l\'embed\`', inline: true },

        )

        await msg.react('✏️')
        await msg.react('📝')
        await msg.react('🗣')
        await msg.react('🖍')
        await msg.react('💶')
        await msg.react('🖼')
        await msg.react('🌐')
        await msg.react('🎨')
        await msg.react('⏲')
        await msg.react('❌')
        await msg.react('✅').then(async (m) => {

        msg.edit(" ", embed)

            let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "✏️") {
                    const embed2 = new Discord.MessageEmbed()
                    .setDescription("**✏️ Entrez le Titre de l'embed -> (\`exemple: Embed\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed2)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setTitle(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed3 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier le Titre !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed3).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "📝") {
                    const embed4 = new Discord.MessageEmbed()
                    .setDescription("**📝 Entrez la Description de l'embed -> (\`exemple: Embed personnalisé\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed4)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setDescription(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed5 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier la Description !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed5).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }
    
                if (reaction._emoji.name === "🗣") {
                    const embed6 = new Discord.MessageEmbed()
                    .setDescription("**🗣 Entrez l'Auteur de l'embed -> (\`exemple: Delta\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed6)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setAuthor(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed7 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier l'Auteur !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed7).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }
                
                if (reaction._emoji.name === "🖍") {
                    const embed8 = new Discord.MessageEmbed()
                    .setDescription("**🖍 Entrez le Footer de l'embed -> (\`exemple: Delta\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed8)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setFooter(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed9 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier le Footer !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed9).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "💶") {
                    const embed10 = new Discord.MessageEmbed()
                    .setDescription("**💶 Entrez l'URL de la Miniature de l'embed -> (\`exemple: https://miniature.com\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed10)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setThumbnail(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed11 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier la Miniature !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed11).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }
                
                if (reaction._emoji.name === "🖼") {
                    const embed12 = new Discord.MessageEmbed()
                    .setDescription("**🖼 Entrez l'URL de l'Image de l'embed -> (\`exemple: https://image.com\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed12)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setImage(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed13 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier l'Image!**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed13).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "🌐") {
                    const embed14 = new Discord.MessageEmbed()
                    .setDescription("**🌐 Entrez l'URL de l'embed -> (\`exemple: https://google.com\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed14)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setURL(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed15 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier l'URL !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed15).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "🎨") {
                    const embed16 = new Discord.MessageEmbed()
                    .setDescription("**🎨 Entrez l'héxadécimal de la Couleur de l'embed -> (\`exemple: #2f3136\`) !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed16)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setColor(collected.first().content)
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed17 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier la Couleur !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed17).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "⏲") {
                    const embed18 = new Discord.MessageEmbed()
                    .setDescription("**⏲ Mettez -> (\`oui\`) pour activer le Timestamp de l'embed !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed18)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        embedbase.setTimestamp()
                        msgg.edit(embedbase)
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed19 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas modifier le Timestamp !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed19).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "✅") {
                    const embed20 = new Discord.MessageEmbed()
                    .setDescription("**✅ Entrez l'id d'un channel -> (\`exemple: 512165123543131\`) pour envoyer l'embed !**")
                    .setColor(`#2f3136`)
                    let question = await message.channel.send(embed20)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()

                        var channel = message.guild.channels.cache.get(collected.first().content)
                        
                        await channel.send(embedbase)

                    }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            const embed21 = new Discord.MessageEmbed()
                            .setDescription("**<a:admin:801770080065159208> Désolé mais je ne peux pas envoyer l'embed !**")
                            .setColor(`#2f3136`)
                            message.channel.send(embed21).then((mm) => mm.delete({
                                timeout: 5000
                        }));
                    })
                }

                if (reaction._emoji.name === "❌") {
                    msg.delete()
                    msgg.delete()
                }
                await reaction.users.remove(message.author.id);
            })
        });
};

module.exports.help = {
  name:"embed2",
  cooldown: 10
}