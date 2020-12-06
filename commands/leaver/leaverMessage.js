const settings = require('./../../settings');

module.exports = {
    commands: 'l-message',
    expectedArgs: '<message> (%USER% will be replaced with username, %SERVER% will be replaced with server name) DEFAULT WELCOME MESSAGE `%USER% left the %SERVER%`',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, text, client) => {
        const welcomeMessage = text//.replace('"', '\\"');

        var s = await settings.GetLeaver(message.guild.id);

        s.message = welcomeMessage;

        settings.SaveLeaver(message.guild.id, s.enabled, s.channel, s.message);

        message.channel.send(`Welcome message set to \`${s.message}\``)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }