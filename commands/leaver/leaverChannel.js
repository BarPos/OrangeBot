const settings = require('./../../settings');

module.exports = {
    commands: 'leaver-channel',
    expectedArgs: '<channel id>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        const channel = message.guild.channels.cache.get(arguments[0]);
        if(channel){
            var s = settings.GetGuildSettings(message.guild.id);

            s.leaver.channel = arguments[0];

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`<#${arguments[0]}> set to be leaver channel.`)
        }else{
            message.channel.send(`\`${arguments[0]}\` is not valid channel id.`)
        }
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }