const util = require('util');
const {client, Discord} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs')

module.exports = {
    commands: 'restart',
    expectedArgs: '<eval>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        await message.channel.send('Restarting...');
        shell.exec('pm2 restart orange');
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }