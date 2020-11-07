const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['slowmode'],
    expectedArgs: '<time / off>',
    permissionError: 'You need MANAGE MESSAGES permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const { channel } = message;

        let duration = arguments[0].toLowerCase();
        if(duration === 'off'){
            duration = 0;
        }

        if(isNaN(duration)) {
            message.reply(`Please provide either a number of seconds or the word \`off\``)
            return
        }

        channel.setRateLimitPerUser(duration)

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setDescription(`Slowmode for <#${channel.id}> has been set to ${duration}s`)
            .setTimestamp()
        message.channel.send(embed)
    },
    permissions: 'MANAGE_MESSAGES',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }