const settings = require('./../../settings');
const config = require('./../../config.json');

module.exports = {
    commands: 'enable-members',
    expectedArgs: '<true / false>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        if(arguments[0] == 'true'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.members.enabled = true;

            const channel = message.guild.channels.cache.get(s.members.channel)

            if(!channel){
                message.channel.send(`Please choose welcomer channel using \`${config.prefix}members-channel <channel id>\`.`)
                return
            }

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Members enabled.`)
        }else if(arguments[0] == 'false'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.members.enabled = false;

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Members disabled.`)
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}enable-members <true / false>\``)
        }
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }