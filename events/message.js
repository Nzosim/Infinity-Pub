const Discord = require("discord.js");

module.exports = async(client, message) => { // ticket mp
    if (message.author.bot) return;
    if(message.channel.type === "dm") {
        const msg = message.content;

        const guild = client.guilds.cache.find(g => g.id === config.guild);

        let categorie = guild.channels.cache.find(c => c.name == "Tickets" && c.type == "category");
        if (!categorie) categorie = await guild.channels.create("Tickets", { type: "category", position: 1 }).catch(e => { return console.error(e) });

        if (!guild.channels.cache.find(c => c.name === `${message.author.id}-ticket`)) {
            guild.channels.create(`${message.author.id}-ticket`, {
                permissionOverwrites: [
                    {
                        deny: 'VIEW_CHANNEL',
                        id: guild.id
                    },
                    {
                        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
                        id: message.author.id
                    },
                ],
                parent: categorie.id,
                topic: `${message.author.id}`
            })
            .then(ch => {
                const e = new Discord.MessageEmbed()
                .setTitle(`Un ticket a été ouvert`)
                .addField(`${message.author.tag}: `, msg)
                .setFooter("Merci de cliquer sur 🔒 pour fermer le ticket.")

                if (message.attachments.size > 0) {
                    e.setImage(message.attachments.first().attachment)
                }
                else {
                    e.setImage(null)
                }

                ch.send(e)
                .then(msg => {
                    msg.react("🔒")
                })
            })
        }
        else {
            const channelTicket = guild.channels.cache.find(c => c.name === `${message.author.id}-ticket`)

            const e = (new Discord.MessageEmbed()
            .setTitle(`${message.author.tag}:`)
            .setDescription(msg)
            .setFooter("Infinity Pub")
            .setTimestamp())

            if (message.attachments.size > 0) {
                e.setImage(message.attachments.first().attachment)
            }
            else {
                e.setImage(null)
            }

            channelTicket.send(e)
        }
    }
    else {
        if (message.channel.name.endsWith("-ticket")) {
            const msg = message.content

            const user = await client.users.fetch(`${message.channel.topic}`)

            const e = (new Discord.MessageEmbed()
            .setTitle(`${message.author.username}:`)
            .setDescription(msg)
            .setFooter("Infinity Pub")
            .setTimestamp())

            const e2 = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}:`)
            .setDescription(msg)
            .setFooter("Infinity Pub")
            .setTimestamp()

            if (message.attachments.size > 0) {
                e.setImage(message.attachments.first().attachment)
                e2.setImage(message.attachments.first().attachment)
            }
            else {
                e.setImage(null)
                e2.setImage(null)
            }
            
            message.channel.send(e2)

            await user.send(e)

            message.delete()
        }
    }
};

