const settings = require('./../../settings');
const config = require('./../../config.json');

module.exports = {
    commands: 'w-enable',
    expectedArgs: '<true / false>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client) => {
        if(arguments[0] == 'true'){
            var s = await settings.GetWelcomer(message.guild.id);

            console.log(s)

            s.enabled = true;

            const channel = message.guild.channels.cache.get(s.channel)

            if(!channel){
                message.channel.send(`Please choose welcomer channel using \`${config.prefix}w-channel <channel id>\`.`)
                return
            }

            await settings.SaveWelcomer(message.guild.id, s.enabled, s.channel, s.message);

            message.channel.send(`Welcomer enabled.`)
        }else if(arguments[0] == 'false'){
            var s = await settings.GetWelcomer(message.guild.id);

            s.enabled = false;

            await settings.SaveWelcomer(message.guild.id, s.enabled, s.channel, s.message);

            message.channel.send(`Welcomer disabled.`)
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}w-enable <true / false>\``)
        }
    },
    permissions: 'ADMINISTRATOR',
    botPermissions: ['SEND_MESSAGES'],
    //requiredRoles: [],
    //allowedUsers: ''
  }