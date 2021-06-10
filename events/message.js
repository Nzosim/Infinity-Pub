  
const Discord = require("discord.js");

module.exports = async(client, message) => {
        if (message.author.bot) return;

        if(message.channel.type === "dm") {
            message.react("📨")
            const msg = message.content;

            const guild = client.guilds.cache.find(g => g.id === '694878667129618443');

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
                            id: '694892829981278208'
                        },
                    ],
                    parent: categorie.id,
                    topic: `${message.author.id}`
                })
                .then(ch => {
                    const e = new Discord.MessageEmbed()
                    .setTitle(`Ticket de ${message.author.username} :`)
                    .setDescription(`Tag: ${message.author.tag}, Id: ${message.author.id}\n${msg}`)
                    .setTimestamp()
                    .setFooter("Infinity Pub")

                    if (message.attachments.size > 0) {
                        e.setImage(message.attachments.first().attachment)
                    }
                    else {
                        e.setImage(null)
                    }
                    
                    message.author.send("Votre ticket a été transmis au support <a:avis_2_2:821430548554711050>");

                    ch.send(e)
                    .then(msg => {
                        msg.react("🔒")
                    })
                })
            }
            else {
                const channelTicket = guild.channels.cache.find(c => c.name === `${message.author.id}-ticket`)

                const e = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} : `)
                .setDescription(msg)
                .setTimestamp()
                .setFooter("Infinity Pub")

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

                const e = new Discord.MessageEmbed()
                .setTitle(message.author.username)
                .setDescription(msg)
                .setTimestamp()
                .setFooter("Infinity Pub")

                const e2 = new Discord.MessageEmbed()
                .setTitle(`${message.author.username} :`)
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
}