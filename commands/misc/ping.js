const {client, Discord} = require('../../index');
const config = require('../../config.json')

module.exports = {
    commands: 'ping',
    //expectedArgs: '',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        message.channel.send('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            const embed = new Discord.MessageEmbed()
                .setAuthor(`Ping`, client.user.displayAvatarURL())
                .setColor(config.color)
                .setDescription(`Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
                .setTimestamp()
            resultMessage.edit(`` + embed)
            // resultMessage.edit(embed)
        });
    },
    //permissions: '',
    //requiredRoles: [],
    //allowedUsers: []
  }