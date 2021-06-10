const Discord = require("discord.js");

module.exports = async (client, reaction, user) => {
        if (user.bot) return
        const { message } = reaction

        if (reaction.emoji.name != "🔒") return
        if (message.channel.name.endsWith("-ticket")){
            const member = client.users.fetch(`${message.channel.topic}`);
                const e = new Discord.MessageEmbed()
                .setTitle("<a:rondattention:821430546961399838> Ticket fermé")
                .setDescription(`Votre ticket a été fermé par le staff <a:avis_2_2:821430548554711050>`)
                .setFooter('Infinity Pub')
                .setTimestamp()
                await member.send(e);
            message.channel.delete()
        }else{return}
}