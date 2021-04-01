Discord = require('discord.js'),
config = require('../config.json')
 
module.exports = {
    run: async (message) => {

        const embeds = [
            { color: '4A4A4A', description: 'tg' },
            { color: '4A4A4A', description: 'toupie' },
            { color: '4A4A4A', description: '3' },
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

    },
    name: 'help',
    guildOnly: true
}



