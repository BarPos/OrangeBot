const settings = require('./../../settings');

module.exports = {
    commands: 'l-channel',
    expectedArgs: '<channel id>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        const channel = message.guild.channels.cache.get(arguments[0]);
        if(channel){
            var s = await settings.GetLeaver(message.guild.id);

            s.channel = arguments[0];

            settings.SaveLeaver(message.guild.id, s.enabled, s.channel, s.message);

            message.channel.send(`<#${arguments[0]}> set to be leaver channel.`)
        }else{
            message.channel.send(`\`${arguments[0]}\` is not valid channel id.`)
        }
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }