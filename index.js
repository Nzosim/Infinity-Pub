const { on } = require('process');
const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
	}),
    config = require('./config.json'),
    fs = require('fs'),
    { promisify } = require('util')
client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

const wait = promisify(setTimeout);
let invites;
const id='694878667129618443';

const usersEveryoneMap = new Map();
const numberBanMap = new Map();
const numberKickMap = new Map();

fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        console.log(`Commande: ${commandName}`);
    });
    console.log(`${files.length} commandes`);
})
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
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

client.on('ready', async() => {
        client.user.setActivity('vos publicités', {type: 'WATCHING'})
})
client.on('ready', async() => {
    await wait(2000);
    client.guilds.cache.get(id).fetchInvites().then(inv => {
        invites=inv;
    })
})

client.on('message', async (message) => {
    try{
        if(message.author.bot) return
        let a = message.client.bot;
        let res = message.content
        const mess = (await message.channel.messages.fetch({
            limit: 100,
            before: message.id,
        })).filter(a => a.author.id === '789190281596764230').array();

        let embed = (new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg")
            .setTimestamp()
            .setTitle(`Infinity Pub`)
            .setDescription('<a:rainbow_fleche_D:821430547061932093> Merci de lire le règlement !\n<a:rainbow_fleche_D:821430547061932093> Si vous quittez vos publicités seront supprimées.\n<a:rainbow_fleche_D:821430547061932093> Vous pouvez poster votre publicité ici toutes les 4 heures.'))
        if ((message.channel.id === "694886091009818751" || message.channel.id === "694886124472107108" || message.channel.id === "694886164716453928" || message.channel.id === "694886287483600938" || message.channel.id === "694886319649718322" || message.channel.id === "694886822077136916" || message.channel.id === "694886978931392632") && res.includes("discord.gg") && message.content.length >= 40){
            message.react("<a:checkgreen_black:821430546395693086>")
            message.react("<a:redcross_black:821430546931908619>")
            message.channel.bulkDelete(mess);
            message.channel.send(embed);
        } else if ((message.channel.id === '844219444423295017') && res.includes("discord.gg") && message.content.length >= 40){
            message.react("<a:checkgreen_black:821430546395693086>")
            message.react("<a:redcross_black:821430546931908619>")
            message.channel.bulkDelete(mess);
            let embed1= (new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg")
            .setTimestamp()
            .setTitle(`Infinity Pub`)
            .setDescription('<a:rainbow_fleche_D:821430547061932093> Merci de lire le règlement !\n<a:rainbow_fleche_D:821430547061932093> Si vous quittez vos publicités seront supprimées.\n<a:rainbow_fleche_D:821430547061932093> Vous pouvez poster votre publicité ici toutes les 2 heures.'))
            message.channel.send(embed1);
        } else if ((message.channel.id === '694885304716492810') && res.includes("discord.gg") && message.content.length >= 40){
            message.react("<a:checkgreen_black:821430546395693086>")
            message.react("<a:redcross_black:821430546931908619>")
            message.channel.bulkDelete(mess);
            let embed2= (new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg")
            .setTimestamp()
            .setTitle(`Infinity Pub`)
            .setDescription('<a:rainbow_fleche_D:821430547061932093> Merci de lire le règlement !\n<a:rainbow_fleche_D:821430547061932093> Si vous quittez vos publicités seront supprimées.\n<a:rainbow_fleche_D:821430547061932093> Vous pouvez poster votre publicité ici toutes les 15 secondes.'))
            message.channel.send(embed2);
        }else if ((message.channel.id === "694886091009818751" || message.channel.id === "694886124472107108" || message.channel.id === "694886164716453928" || message.channel.id === "694886287483600938" || message.channel.id === "694886319649718322" || message.channel.id === "694886822077136916" || message.channel.id === "694886978931392632" || message.channel.id === '694885304716492810' || message.channel.id === '844219444423295017') && !res.includes("discord.gg")){
        message.delete()
        message.reply(`votre publicité doit contenir un lien <a:rondattention:821430546961399838>`)
        }else if((message.channel.id === "694886091009818751" || message.channel.id === "694886124472107108" || message.channel.id === "694886164716453928" || message.channel.id === "694886287483600938" || message.channel.id === "694886319649718322" || message.channel.id === "694886822077136916" || message.channel.id === "694886978931392632" || message.channel.id === '694885304716492810' || message.channel.id === '844219444423295017') && res.includes("discord.gg") && message.content.length <= 40){
            message.delete()
            message.reply("votre publicité doit contenir une description <a:rondattention:821430546961399838>")  



        } else if ((message.channel.id === '694887282188222496') && (res.includes("www.twitch.tv") || res.includes("youtu.be") || res.includes("youtube"))){
            message.react("<a:checkgreen_black:821430546395693086>")
            message.react("<a:redcross_black:821430546931908619>")
            message.channel.bulkDelete(mess);
            let emb= (new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg")
            .setTimestamp()
            .setTitle(`Infinity Pub`)
            .setDescription('<a:rainbow_fleche_D:821430547061932093> Merci de lire le règlement !\n<a:rainbow_fleche_D:821430547061932093> Si vous quittez vos publicités seront supprimées.\n<a:rainbow_fleche_D:821430547061932093> Vous pouvez poster votre publicité ici toutes les 4 heures.'))
            message.channel.send(emb);
        }else if ((message.channel.id === "694887282188222496")){
            message.delete()
            message.reply(`votre publicité doit contenir un lien <a:rondattention:821430546961399838>`)
        }else if ((message.channel.id === '694887407543124048' || message.channel.id === "844238605492682772")){
            message.react("<a:checkgreen_black:821430546395693086>")
            message.react("<a:redcross_black:821430546931908619>")
            message.channel.bulkDelete(mess);
            let emb= (new Discord.MessageEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/810910470340608055/810921131405344818/1606406636311.jpg")
            .setTimestamp()
            .setTitle(`Infinity Pub`)
            .setDescription('<a:rainbow_fleche_D:821430547061932093> Merci de lire le règlement !\n<a:rainbow_fleche_D:821430547061932093> Si vous quittez vos publicités seront supprimées.\n<a:rainbow_fleche_D:821430547061932093> Vous pouvez poster votre publicité ici toutes les 4 heures.'))
            message.channel.send(emb);
        }



    }catch(e){
        console.log("Erreur verifdirectchannelpub \n   "+e)
        message.guild.channels.cache.get('844219084584910848').send("Erreur __verifdirectchannelpub__ :\n   "+e);
    }
    try{
        if(message.content.includes("tg") || message.content.includes("ftg") || message.content.includes("tagueule") || message.content.includes("ta gueule")
        || message.content.includes("ptn") || message.content.includes("putain") || message.content.includes("connard") || message.content.includes("t con")
        || message.content.includes("encule") || message.content.includes("enculé") || message.content.includes("enculer") || message.content.includes("nické")){
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
    }catch(e){
        console.log("Erreur antiinsulte \n   "+e)
        message.guild.channels.cache.get('844219084584910848').send("Erreur __antiinsulte__ :\n   "+e);
    }

    try{
        if(message.channel.id === '844218988535873566' && message.author.bot){
            message.react("<a:checkgreen_black:810958738461949983>")
            message.react("<a:redcross_black:821430546931908619>")
        }
        if (message.type !== 'DEFAULT' || message.author.bot) return
        let sto = message.content.toLowerCase();
        if((message.channel.id === "694886091009818751" || message.channel.id === "694886124472107108" || message.channel.id === "694886164716453928" || message.channel.id === "694886287483600938" || message.channel.id === "694886319649718322" || message.channel.id === "694886822077136916" || message.channel.id === "694886978931392632" || message.channel.id === '694885304716492810' || message.channel.id === '844219444423295017' || message.channel.id === '694887282188222496' || message.channel.id === '694887407543124048' || message.channel.id === '694887433036234772' || message.channel.id === '844238605492682772')){
            let salon = message.channel.name
            let aut = message.author.tag
            let bool = false
            let cat = () => {
                let res='';
                if(sto.includes("pub") || sto.includes("publicitaire")){
                    res="[Publicitaire <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res='[Publicitaire <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("communautaires") || sto.includes("communauté")){
                    res+="[Communautaire <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res+='[Communautaire <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("gaming") || sto.includes("e-sport") || sto.includes("among us") || sto.includes("minecraft") || sto.includes("fortnite") || sto.includes("gameur")){
                    res+="[Gaming <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res+='[Gaming <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("rp")){
                    res+="[RolePlay <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res+='[RolePlay <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("art") || sto.includes("graphistes") || sto.includes("gif") || sto.includes("logo") || sto.includes("miniature")){
                    res+="[Artistique <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res+='[Artistique <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("bot")){
                    res+="[Bot <a:avis_2_2:821430548554711050>] "
                    bool = true
                }else {res+='[Bot <a:avis_2_1:821430551415619594>]'}
                if(sto.includes("informatique") || sto.includes("developpement") || sto.includes("hebergement")){
                    res+="[Informatique <a:avis_2_2:821430548554711050>]"
                    bool = true
                }else {res+='[Informatique <a:avis_2_1:821430551415619594>]'}
                if(bool == false){
                    res="[Autre]"
                }
                return res;
            }
            let lien = message.url
            let chan = message.guild.channels.cache.find((ch) => ch.id === '844218988535873566');
            let sto = message.content;
            let id = message.author.id;
            chan.send(new Discord.MessageEmbed().setTitle("Publicité de : " + aut)
                .setDescription("__**Catégorie détecté :\n**__" + cat() + "\n\n__**Lien vers la publicité :** \n__" + lien +"\n\n **__Salon : __** "+ salon  +"\n\n__**Publicité :** __\n" + sto)
                .setTimestamp())
        }
    }catch(e){
        console.log("Erreur envoiepubchanneladmin \n   "+e)
        message.guild.channels.cache.get('844219084584910848').send("Erreur __envoiepubchanneladmin__ :\n   "+e)
    }

    try{
        if(message.author.bot) return;
        if(message.mentions.everyone){
            if(usersEveryoneMap.has(message.author.id)){
                const userData = usersEveryoneMap.get(message.author.id);
                let {numberEveryoneSent} = userData;
                numberEveryoneSent +=1;
                userData.numberEveryoneSent = numberEveryoneSent;
                usersEveryoneMap.set(message.author.id, userData);
                if(numberEveryoneSent == 2){
                    message.delete();
                    message.channel.send('Encore un everyone et vous serez ban <a:rondattention:821430546961399838>');
                }
                if(numberEveryoneSent >= 3){
                    message.delete();
                    message.guild.member(message.author.id).ban({reason: 'Spam mention everyone'})
                }
            }
            else{
                usersEveryoneMap.set(message.author.id, {
                    numberEveryoneSent: 1
                });
                setTimeout(() => {
                    usersEveryoneMap.delete(message.author.id);
                }, 20000);
            }
        }
    }catch(e){
        console.log("Erreur antieveryone \n   "+e)
        message.guild.channels.cache.get('844219084584910848').send("Erreur __antieveryone__ :\n   "+e);
    }

    try{
        if(message.author.bot) return;
        if(message.mentions.has('789190281596764230'))
        message.channel.send(new Discord.MessageEmbed().setDescription('Vous m\'avez appelé ?\nMon prefix est `./` <a:avis_2_2:821430548554711050>'))
    }catch(e){
        console.log("Erreur mentionprefix \n   "+e)
        message.guild.channels.cache.get('844219084584910848').send("Erreur __mentionprefix__ :\n   "+e);
    }
})
client.on('guildMemberAdd', async (member, bot) => { 
        if(member.guild.id != id)return
        member.guild.fetchInvites().then(gInvites =>{
            const invite = gInvites.find((inv) => invites.get(inv.code).uses < inv.uses);
            const channel = member.guild.channels.cache.get('694882041715752971');
            channel.send(`${member} __viens de nous rejoindre__ <a:avis_2_2:821430548554711050>\nIl a été invité par ${invite.inviter.tag} !\nNous sommes __à présent ${member.guild.memberCount}__ sur Infinity Pub <a:speaker_excited:821430547263389696>`);
        })
        member.send("**Merci de nous avoir rejoint sur Infinity Pub**\n\nPartenaire mp :\nhttps://discord.gg/PqtnJk6WX8")

        if(member.user.bot) member.ban({reason: 'Anti-Bot actifs'})
})
client.on('guildMemberRemove', async (member, bot) => { 
        const channel = member.guild.channels.cache.get('694882041715752971')
        channel.send(`${member} vien de quitter infinity pub <a:rondattention:821430546961399838>\nNous sommes __à présent ${member.guild.memberCount}__ <a:speaker_excited:821430547263389696>`)
        member.guild.fetchBans(member).then((bansUser) => {
            return
        }).catch(banunban => { 
            member.ban({days:7})
            member.guild.members.unban(member.id)})
        const audit = (await member.guild.fetchAuditLogs()).entries.first();
        if(audit.action === 'MEMBER_KICK'){
            if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return;
            if(numberKickMap.has(audit.executor.id)){
                const userData = numberKickMap.get(audit.executor.id);
                let {nKick} = userData;
                nKick += 1;
                userData.nKick=nKick;
                numberKickMap.set(audit.executor.id, userData);
                if(nKick === 5){
                    const rolesStaff = ['694892829981278208'];
                    member.guild.member(audit.executor.id).roles.remove(rolesStaff)
                    const guild = client.guilds.cache.find(g => g.id === `694878667129618443`);
                    const chan = guild.channels.cache.get('844219084584910848');
                    chan.send(`${audit.executor.tag} a été unrank pour avoir créé kick 5 personne <a:rondattention:821430546961399838>`)
                }
            }
            else {
                numberKickMap.set(audit.executor.id, {
                    nKick: 1
                });
                setTimeout(() => {
                    numberKickMap.delete(audit.executor.id);
                },10000)
            }
        }
})
client.on('channelCreate', async (channel) => {
        if(!channel.guild) return;
        const audit = (await channel.guild.fetchAuditLogs()).entries.first();
        if(audit.action === 'CHANNEL_CREATE'){
            if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return
            channel.delete();
            const rolesStaff = ['694892829981278208'];
            channel.guild.member(audit.executor.id).roles.remove(rolesStaff);
            const chan = channel.guild.channels.cache.get('844219084584910848');
            chan.send(`${audit.executor.tag} a été unrank pour avoir créé un channel <a:rondattention:821430546961399838>`)
        }
})
client.on('channelDelete', async (channel) => {
        if(!channel.guild) return;
        const audit = (await channel.guild.fetchAuditLogs()).entries.first();
        if(audit.action === 'CHANNEL_DELETE'){
            if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return;
            const rolesStaff = ['694892829981278208'];
            channel.guild.member(audit.executor.id).roles.remove(rolesStaff);
            const chan = channel.guild.channels.cache.get('844219084584910848');
            chan.send(`${audit.executor.tag} a été unrank pour avoir supprimé un channel <a:rondattention:821430546961399838>`)
        }
})
client.on('webhookUpdate', async channel => {
        const audit = (await channel.guild.fetchAuditLogs()).entries.first();
        if(audit.action === 'WEBHOOK_CREATE'){
            if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return;
            (await channel.fetchWebhooks(audit.id)).first().delete();
            const rolesStaff = ['694892829981278208'];
            channel.guild.member(audit.executor.id).roles.remove(rolesStaff)
            const chan = channel.guild.channels.cache.get('844219084584910848');
            chan.send(`${audit.executor.tag} a été unrank pour avoir créé un webhook <a:rondattention:821430546961399838>`)
        }
})
client.on('guildBanAdd', async (guild, member) => {
        const audit = (await guild.fetchAuditLogs()).entries.first();
        if(audit.action === 'MEMBER_BAN_ADD'){
            if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return;
            if(numberBanMap.has(audit.executor.id)){
                const userData = numberBanMap.get(audit.executor.id);
                let {nBan} = userData;
                nBan += 1;
                userData.nBan=nBan;
                numberBanMap.set(audit.executor.id, userData);
                if(nBan === 5){
                    const rolesStaff = ['694892829981278208'];
                    guild.member(audit.executor.id).roles.remove(rolesStaff);
                    const guild = client.guilds.cache.find(g => g.id === `694878667129618443`);
                    const chan = guild.channels.cache.get('844219084584910848');
                    chan.send(`${audit.executor.tag} a été unrank pour avoir ban 5 personnes <a:rondattention:821430546961399838>`)
                    // guild.member(audit.executor.id).kick();
                    // guild.member(audit.executor.id).ban({reason: "anti mass ban"});
                }
            }
            else {
                numberBanMap.set(audit.executor.id, {
                    nBan: 1
                });
                setTimeout(() => {
                    numberBanMap.delete(audit.executor.id);
                },10000)
            }
        }
    client.on('guildBanAdd', async (guild, member) => {
    const audit = (await guild.fetchAuditLogs()).entries.first();
    if(audit.action === 'MEMBER_BAN_ADD'){
        if(audit.executor.id === '552536895373180979' || audit.executor.id === '789190281596764230') return;
        if(numberBanMap.has(audit.executor.id)){
            const userData = numberBanMap.get(audit.executor.id);
            let {nBan} = userData;
            nBan += 1;
            userData.nBan=nBan;
            numberBanMap.set(audit.executor.id, userData);
            if(nBan === 5){
                const rolesStaff = ['694892829981278208'];
                guild.member(audit.executor.id).roles.remove(rolesStaff);
                const guild = client.guilds.cache.find(g => g.id === `694878667129618443`);
                const chan = guild.channels.cache.get('844219084584910848');
                chan.send(`${audit.executor.tag} a été unrank pour avoir ban 5 personnes <a:rondattention:821430546961399838>`)
                // guild.member(audit.executor.id).kick();
                // guild.member(audit.executor.id).ban({reason: "anti mass ban"});
            }
        }
        else {
            numberBanMap.set(audit.executor.id, {
                nBan: 1
            });
            setTimeout(() => {
                numberBanMap.delete(audit.executor.id);
            },10000)
        }
    }
})
})








// client.on('messageReactionAdd', (reaction , user, message) => {
//     if(user.bot) return;
//     if(reaction.message.channel.id === '818608494055653427'){
//         if(reaction.emoji.name === 'redcross_black') {
//             reaction.message.react('🇲')
//             reaction.message.react('🇹')
//             reaction.message.react('ℹ️')
//             reaction.message.react('🇸')
//             reaction.message.react('❌')
//         }
//     }
//     if(reaction.emoji.name === '🇲'){
//         // const member = reaction.message.author
//         // console.log(member)
//         reaction.message.channel.send(reaction.message.content)
//         // const reason = 'Pub dans le mauvai salon'
//         // if (!client.db.warns[member.id]) client.db.warns[member.id] = []
//         // client.db.warns[member.id].unshift({
//         //     reason,
//         //     date: Date.now(),
//         //     modo: reaction.users.id
//         // })
//         // fs.writeFileSync('./db.json', JSON.stringify(client.db))
//         // reaction.message.channel.send(new Discord.MessageEmbed().setAuthor(`${member.user.tag} a été warn`, member.user.displayAvatarURL())
//         //     .setDescription(`**Raison : **${reason}`)).then(sent => sent.delete({timeout: 5e3}))
//         // reaction.message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
//         //     .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
//         //     .addField('Utilisateur', member, true)
//         //     .addField('Modérateur', reaction.users, true)
//         //     .addField('Raison', reason, true)
//         //     .addField('Salon', message.channel, true))
//         // member.send(new Discord.MessageEmbed()
//         // .setAuthor(`[WARN] Vous avez été warn sur Infinity Pub`, member.user.displayAvatarURL())
//         // .addField('Modérateur', reaction.users, true)
//         // .addField('Raison', reason, true)
//         // .addField('Salon', reaction.message.channel, true)
//         // .setFooter('Si vous souhaitez contester ce warn repondé a ce message !'))
//         // message.delete();

//         // reaction.message.delete()
//     }
// })