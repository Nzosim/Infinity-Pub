const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
	}),
    config = require('./config.json'),
    fs = require('fs')

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')
const AntiSpam = require('discord-anti-spam');

fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Commande: ${commandName}`);
    });
    console.log(`${files.length} commandes`);
});
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Event: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    console.log(`${files.length} events`)
});


client.on('message', async (message) => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
    let a = message.client.bot;
    let res = message.content
    const mess = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
    })).filter(a => a.author.id === '789190281596764230').array();
    let embed = new Discord.MessageEmbed().setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg").setTimestamp().setTitle('Infinity Pub').setDescription('<a:rainbow_fleche_D:810912252042412113> Merci de lire le réglement !\n <a:rainbow_fleche_D:810912252042412113> Si vous quittez vos publicités seront supprimés\n <a:rainbow_fleche_D:810912252042412113> Vous pouvez poster votre publicités ici toutes les 6 heures')
    // envoie la description si il est dans le bon channel qu'il a une descrp et un lien
    if (message.channel.id === "818608494055653427" && res.includes("discord.gg") && message.content.length >= 40){
        message.react("<a:checkgreen_black:810958738461949983>")
        message.react("<a:redcross_black:810958738814009395>")
        message.channel.bulkDelete(mess);
        message.channel.send(embed);
    // sinon si il n'a pas de description 
    }else if(message.channel.id === "818608494055653427" && res.includes("discord.gg") && message.content.length <= 40 && !message.member.hasPermission('MANAGE_MESSAGES')){
        message.delete()
        message.reply("votre publicités doit contenir une description !")
    //  sinon si il n'a pas de lien
    }else if (message.channel.id === "818608494055653427" && !message.member.hasPermission('MANAGE_MESSAGES')){
        message.delete()
        message.reply(`votre publicités doit contenir un lien !`)
    }
    
    // empeche les liens dans les channels ajouté
    if(message.channel.id === "810910470340608055" && res.includes("https://") && !message.member.hasPermission('MANAGE_MESSAGES')){
        message.delete();
        message.reply("les liens ne sont pas autorisés dans ce salon !");
    }

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

// activité
client.on('ready', () => {
    const statuses = [
        () => `vos publicités`,
        () => `son créateur Nzosim#1111`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'WATCHING'})
        i = ++i % statuses.length
    }, 2e4)
    setInterval(() => {
        const [bots, humans] = client.guilds.cache.first().members.cache.partition(member => member.user.bot)
        client.channels.cache.get(config.serverStats.total).setName(`📬 Membre : ${client.guilds.cache.first().memberCount}`)
    }, 3e4)
})

client.on("message", async (message, member, user) =>{  // politesse
    if (message.type !== 'DEFAULT' || message.author.bot) return
    message.content = message.content.toLowerCase();
    if(message.content.includes('salut') || message.content.includes('slt') || message.content.includes('hello') || message.content.includes('hi') || message.content.includes('hey') ||
    message.content.includes('coucou') || message.content.includes('yo') || message.content.includes('wesh') ||
    message.content.includes('bonsoir') || message.content.includes('hola') || message.content.includes('cc') || message.content.includes('bjr') || message.content.includes('bonjour')){
          message.reply('bonjour!')
    }
    //anti insulte
    if(message.content.includes("tg") || message.content.includes("ftg") || message.content.includes("tagueule") || message.content.includes("ta gueule")
     || message.content.includes("ptn") || message.content.includes("putain") || message.content.includes("connard") || message.content.includes("t con")
     || message.content.includes("encule") || message.content.includes("enculé")){
        if (message.author.id === '552536895373180979') return ;
        const reason = "Langage inaproprié"
        if (!client.db.warns[message.member.id]) client.db.warns[message.member.id] = []
        client.db.warns[message.member.id].unshift({
            reason,
            date: Date.now(),
            modo: "Bot"
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag} a été warn`, message.author.displayAvatarURL())
            .setDescription(`**Raison : **${reason}`)).then(sent => sent.delete({timeout: 5e3}))
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[WARN] ${message.author.tag}`, message.author.displayAvatarURL())
            .addField('Utilisateur', message.member, true)
            .addField('Modérateur', 'Bot', true)
            .addField('Raison', reason, true)                            
            .addField('Salon', message.channel, true))
        message.member.send(new Discord.MessageEmbed()
        .setAuthor(`[WARN] Vous avez été warn sur Infinity Pub`, message.author.displayAvatarURL())
        .addField('Modérateur', 'Bot', true)
        .addField('Raison', reason, true)
        .addField('Salon', message.channel, true)
        .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
        message.delete()
     }
})


client.on('guildMemberAdd', member => {  // bjr
    member.guild.channels.cache.get(config.greeting.channel).send(`${member} a rejoint Infinity Pub. Nous sommes désormais ${member.guild.memberCount} !`)
    member.roles.add(config.greeting.role)
    member.send("**Merci de nous rejoindre sur Infinity Pub**\n  Voici nos partenaire mp :\n\nhttps://discord.gg/PqtnJk6WX8\nhttps://discord.gg/CRxTmkQxEE")
    // member.send('ok')
})
 
client.on('guildMemberRemove', async (member) => { // slt
    member.guild.channels.cache.get(config.greeting.channel).send(`${member} nous a quitté.`)
    // let userMessage = (await message.channel.messages.fetch).filter((m) => m.author.id === member.id);
    // const mess = (await message.channel.fetch()).filter(a => a.author.id === member.id).array();
    // member.guild.channels.cache.get(config.greeting.channel).send(`${member.user.tag} vien de nous quitter.`);
    // message.bulkDelete(mess);
    // message.channel.messages.fetch()
    //     .then(messages => console.log(`${messages.filter(m => m.author.id === member.id).size} messages`))

    // messages = message.filter(m => m.author.id === filterBy).array()
    // member.guild.bulkDelete(messages)

    // await member.message.guild.bulkDelete(messages)
})


// const mess = (await message.channel.messages.fetch({
//     limit: 100,
//     before: message.id,
// })).filter(a => a.author.id === '789190281596764230').array();
// message.channel.bulkDelete(mess);

client.on('message', message => {   // detecte les selfbot
    if (message.nonce === null && message.attachments.size <= 0 && !message.author.bot && message.guild){
      message.channel.send(`${message.author.tag} utilise un selfbot - ID: ${message.author.id}`).then(message => { message.delete({ timeout: 8000 })})
      message.delete()
  //Logs détection de selfbot
      const logchannel = message.guild.channels.cache.find((ch) => ch.name === "logadmin");
      const embed = new Discord.MessageEmbed()
      .setColor('F10916')
      .setTitle('Selfbot détecté')
      .addField('Utilisateur ayant le selfbot', message.author)
      .addField('Détecté dans', message.channel)
      if (!logchannel) return;
      logchannel.send(embed);
    }
})

    

// client.on('messageReactionAdd', (message, reaction , user, emojis) => {
//     // const prop = reaction.emoji.id ? 'id' : 'name'
//     // const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
//     // const emoji = message.guild.emojis.cache.get("818061950600347669");

//     if (reaction.emoji.name === 'redcross_black') message.delete();
//     else reaction.users.remove(user)
    

// })

client.on('message', message => {  // logadmin
    if(message.channel.id === '811644096527204424'){
        message.react('<a:checkgreen_black:810958738461949983>')
        message.react('<a:speaker_excited:819317837357252639>')
        message.react('<a:rondattention:819914483190726688>')
        message.react(' <a:compte_a_rebourd:819317820415672361>')
        message.react('<a:loading:819318530401894400>')
        message.react('<a:redcross_black:810958738814009395>')
    }
    if (message.type !== 'DEFAULT' || message.author.bot) return
    let sto = message.content;
    if(message.channel.id === '818608494055653427'){
        let salon = message.channel.name
        let aut = message.author.tag
        let bool = false
        let cat = () => {
            let res;
            // categorie pub
            if(message.content.includes("Pub") || message.content.includes("Publicitaire") || message.content.includes("pub") || message.content.includes("publicitaire")){
                res="[Publicitaire], "
                bool = true
            }
            if(message.content.includes("Communautaires") || message.content.includes("Communauté") || message.content.includes("communautaires") || message.content.includes("communauté")){
                res+="[Communautaire], "
                bool = true
            }
            if(message.content.includes("Gaming") || message.content.includes("E-sport") || message.content.includes("Among us") || message.content.includes("Minecraft") || message.content.includes("Fortnite") || message.content.includes("Gameur") || message.content.includes("gaming") || message.content.includes("e-sport") || message.content.includes("among us") || message.content.includes("minecraft") || message.content.includes("fortnite") || message.content.includes("gameur")){
                res+="[Gaming], "
                bool = true
            }
            if(message.content.includes("Rp") || message.content.includes("rp")){
                res+="[RolePlay], "
                bool = true
            }
            if(message.content.includes("Art") || message.content.includes("Graphistes") || message.content.includes("Gif") || message.content.includes("Logo") || message.content.includes("Miniature") || message.content.includes("art") || message.content.includes("graphistes") || message.content.includes("gif") || message.content.includes("logo") || message.content.includes("miniature")){
                res+="[Artistique], "
                bool = true
            }
            if(message.content.includes("Bot") || message.content.includes("bot")){
                res+="[Bot], "
                bool = true
            }
            if(message.content.includes("Informatique") || message.content.includes("Developpement") || message.content.includes("Hebergement") || message.content.includes("informatique") || message.content.includes("developpement") || message.content.includes("hebergement")){
                res+="[Informatique]"
                bool = true
            }
            if(bool == false){
                res="[Autre]"
            }
            return res;
        }
        let lien = message.url
        let chan = message.guild.channels.cache.find((ch) => ch.name === 'logadmin');
        let sto = message.content;
        chan.send(new Discord.MessageEmbed().setTitle("Publicité de : " + aut)
            .setDescription("__**Catégorie détecté :\n**__" + cat() + "\n\n__**Lien vers la publicité :** \n__" + lien +"\n\n **__Salon : __** "+ salon  +"\n\n__**Publicité :** __\n" + sto+"\n\n**__Warn :__**\n<a:checkgreen_black:810958738461949983> Pub conforme \n<a:speaker_excited:819317837357252639> Warn le membre pour non respect des Tos\n<a:rondattention:819914483190726688> Supprime une publicité et averti le membre que son lien est invalide\n<a:compte_a_rebourd:819317820415672361> Warn le membre pour mauvais salon\n<a:loading:819318530401894400> Warn le membre pour spam\n<a:redcross_black:810958738814009395> Supprime seulement la pub du membre")
            .setTimestamp())
}})






//antispam
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 20, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 3, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 20, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});

client.on('message', (message) => antiSpam.message(message)); 