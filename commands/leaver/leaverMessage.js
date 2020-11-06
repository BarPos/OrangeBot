const settings = require('./../../settings');

module.exports = {
    commands: 'leaver-message',
    expectedArgs: '<message> (%USER% will be replaced with username, %SERVER% will be replaced with server name) DEFAULT WELCOME MESSAGE `Welcome %USER% to the %SERVER%`',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        const welcomeMessage = text.replace('"', '\\"');

        var s = settings.GetGuildSettings(message.guild.id);

        s.welcomer.message = welcomeMessage;

        settings.SetGuildSettings(message.guild.id, s);

        message.channel.send(`Welcome message set to \`${s.welcomer.message}\``)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }