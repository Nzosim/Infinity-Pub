Discord = require('discord.js'),
config = require('../config.json')
 
module.exports = {
    run: async (message) => {
      try{
        const embeds = [
            { color: '66FF33', description: '**__Menu d\'aide :__**\n\n**1.Modération** ⚒️\nCette catégorie contient toutes les commandes de modération du serveur\n\n**2.Publicité** 📨\nCette catégorie contient toutes les commandes pour gérer la publicité sur le serveur\n\n**3.Owner** ⚔️\nCette catégorie contient toutes les commandes disponible par l\'owner uniquement' },
            { color: 'FFFF00', description: '**__Commande de Modération :__**\n\n`ban <@membre> [raison]`\nCette commande permet de bannir une personne du serveur\n\n`tempban <@membre> <temp> [raison]`\nCette commande permet de bannir une personne pour une durée donnée\n\n`mute <@membre> [raison]`\nCette personne permet de mute une personne\n\n`tempmute <@membre> <temp> [raison]`\nCette commande permet de mute une personne pour une durée donnée\n\n`unmute <@membre> [raison]`\nCette personne permet d\'unmute une personne\n\n`kick <@membre> [raison]`\nCette commande permet de kick une personne du serveur\n\n`warn <@membre> <raison>`\nCette commande permet de donner un avertissement a une personne\n\n`unwarn <@membre>`\nCette commande permet d\'enlever un avertissement a une personne\n\n`checkwarn <@membre>`\nCette commande permet de regarder les avertissements d\'une personne\n\n`clear <nbr>`\nCette commande permet de supprimer un nombre de message donnée'},
            { color: '0000FF', description: '**__Commande Publicitaire :__**\n\n`nettoy`\nCette commande permet de nettoyer un salon\n\n`moi`\nCette commande permet d\'indiquer que l\'on prend en charge le ticket\n\n`plusmoi`\nCette commande permet d\'indiquer que l\'on ne prend plus le ticket en charge' },
            { color: 'CC0000', description: '**__Commande Owner :__**\n\n`addrole <@membre> <@rôle>`\nCette commande permet d\'ajouter un rôle à une personne\n\n`removerole <@membre> <@rôle>`\nCette commande permet de retirer un rôle a un membre du serveur\n\n`serverinfo`\nCette commande permet de donner des informations sur le serveur\n\n`userinfo <@membre>`\nCette commande permet de donner des informations sur un membre\n\n`ping`\nCette commande permet de donner le ping du bot\n\n`embed <message>`\nCette commande permet de transformer un message en embed\n\n`editembed <id> <message>`\nCette commande permet de modifier un embed existant\n\n`shutdown`\nCette commande permet d\'éteindre le bot\n\n`slowmode >temps>`\nCette commande permet de modifier le slowmode d\'un salon\n\n`sondage <question> | <choix> [|] [choix]`\nCette commande permet de créer des sondages'},
          ]
        
          let x = 0
          const msg = await message.channel.send({ embed: embeds[x] })
        
          await msg.react('◀️')
          await msg.react('❌')
          await msg.react('▶️')
          
        
          const collector = msg.createReactionCollector((react, user) => ['◀️', '▶️', '❌'].includes(react.emoji.name) && user.id == message.author.id, { time: 2 * 60 * 1000 })
        
          collector.on('collect', (react, user) => {
            switch (react.emoji.name) {
              case '◀️':
                if (embeds[x - 1]) msg.edit({ embed: embeds[--x] }).catch(() => {})
                    react.users.remove(user)
                break
              case '▶️':
                if (embeds[x + 1]) msg.edit({ embed: embeds[++x] }).catch(() => {})
                react.users.remove(user)
                break
              case '❌':
                collector.stop()
                break
            }
          })
          collector.on('end', () => msg.reactions.removeAll().catch(() => {}))
        }catch(e){
          console.log("Erreur lors de l\'éxecution de la commande help \n   "+e)
          message.guild.channels.cache.get('844219046546898984').send("Erreur lors de l\'éxecution de la commande _help_ :\n   "+e);
        }

    },
    name: 'help',
    guildOnly: true
}



