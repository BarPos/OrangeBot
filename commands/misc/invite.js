// https://discord.com/api/oauth2/authorize?client_id=769630010020593674&permissions=8&scope=bot
const {MessageEmbed} = require('discord.js')
const config = require('../../config.json')

module.exports = {
    commands: ['invite'],
    //expectedArgs: '<num1> <num2>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`Click here to invite me!`)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=769630010020593674&permissions=8&scope=bot`)
            .setTimestamp()

        message.channel.send(embed)
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }