const settings = require('../../settings');
const config = require('../../config.json');

module.exports = {
    commands: 'enable-leaver',
    expectedArgs: '<true / false>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        if(arguments[0] == 'true'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.leaver.enabled = true;

            const channel = message.guild.channels.cache.get(s.leaver.channel)

            if(!channel){
                message.channel.send(`Please choose leaver channel using \`${config.prefix}leaver-channel <channel id>\`.`)
                return
            }

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Leaver enabled.`)
        }else if(arguments[0] == 'false'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.leaver.enabled = false;

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Leaver disabled.`)
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}enable-leaver <true / false>\``)
        }
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }