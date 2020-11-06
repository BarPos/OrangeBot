const settings = require('./../../settings');
const config = require('./../../config.json');

module.exports = {
    commands: 'enablewelcomer',
    expectedArgs: '<true / false>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        if(arguments[0] == 'true'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.welcomer.enabled = true;

            if(s.welcomer.channel == ''){
                message.channel.send(`Please choose welcomer channel using \`${config.prefix}setwelcomechannel <channel id>\`.`)
                return
            }

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Welcomer enabled.`)
        }else if(arguments[0] == 'false'){
            var s = settings.GetGuildSettings(message.guild.id);

            s.welcomer.enabled = false;

            settings.SetGuildSettings(message.guild.id, s);

            message.channel.send(`Welcomer disabled.`)
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}enablewelcomer <true / false>\``)
        }
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }