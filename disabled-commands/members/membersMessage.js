const settings = require('./../../settings');

module.exports = {
    commands: 'members-message',
    expectedArgs: '<message> (%MEMBERS% will be replaced with members count) DEFAULT WELCOME MESSAGE `%MEMBERS% Members`',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        const welcomeMessage = text.replace('"', '\\"');

        var s = settings.GetGuildSettings(message.guild.id);

        s.members.message = welcomeMessage;

        settings.SetGuildSettings(message.guild.id, s);

        message.channel.send(`Welcome message set to \`${s.members.message}\``)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }