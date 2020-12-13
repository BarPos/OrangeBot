const settings = require('../../settings');
const config = require('../../config.json');

module.exports = {
    commands: 'l-enable',
    expectedArgs: '<true / false>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        if(arguments[0] == 'true'){
            var s = await settings.GetLeaver(message.guild.id);

            s.enabled = true;

            const channel = message.guild.channels.cache.get(s.channel)

            if(!channel){
                message.channel.send(`Please choose leaver channel using \`${config.prefix}l-channel <channel id>\`.`)
                return
            }

            settings.SaveLeaver(message.guild.id, s.enabled, s.channel, s.message);

            message.channel.send(`Leaver enabled.`)
        }else if(arguments[0] == 'false'){
            var s = await settings.GetLeaver(message.guild.id);

            s.leaver.enabled = false;

            settings.SaveLeaver(message.guild.id, s.enabled, s.channel, s.message);

            message.channel.send(`Leaver disabled.`)
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}l-enable <true / false>\``)
        }
    },
    permissions: 'ADMINISTRATOR',
    botPermissions: ['SEND_MESSAGES'],
    //requiredRoles: [],
    //allowedUsers: ''
  }