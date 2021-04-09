module.exports = {
    commands: ['say'],
    expectedArgs: '<num1>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        message.channel.send(text)
        message.delete()
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: ['437992463165161472', '482864844823986177']
  }