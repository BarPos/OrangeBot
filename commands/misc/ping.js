module.exports = {
    commands: 'ping',
    //expectedArgs: '',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        message.channel.send('Calculating ping...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            resultMessage.edit(`Bot Latency: ${ping}ms, API Latency: ${client.ws.ping}ms`)
        });
    },
    //permissions: '',
    //requiredRoles: [],
    //allowedUsers: []
  }