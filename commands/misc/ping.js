module.exports = {
    commands: 'ping',
    //expectedArgs: '',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        message.reply(`Pong!`)
    },
    //permissions: '',
    //requiredRoles: [],
    //allowedUsers: []
  }