const Discord = require("discord.js");

module.exports = async (client, reaction, user) => {
    if (user.bot) {
        return
    }
    else {
        //Get message frome reaction (reaction.message => message)
        const { message } = reaction

        //fermer les tickets mp
        if (reaction.emoji.name === "🔒") {
            if (message.channel.name.endsWith("-ticket")) {
                const user = await client.users.fetch(`${message.channel.topic}`);
                
                const e = new Discord.MessageEmbed()
                .setTitle("<a:rondattention:819914483190726688> Ticket fermé")
                .setDescription(`Votre ticket a été fermé par le staff.`)
                .setFooter('Infinity Pub')
                .setTimestamp()

                await user.send(e);

                message.channel.delete();
            }
            else {
                return;
            }
        }
    }
}
