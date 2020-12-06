const util = require('util');
const {client} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs')

module.exports = {
    commands: 'update',
    expectedArgs: '<eval>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        if (!shell.which('git')) {
            shell.echo('Sorry, this script requires git');
            shell.exit(1);
            return
        }
        await message.channel.send(`Downloading Update...`)
        if (shell.exec('git pull https://github.com/BarPos/OrangeBot.git').code !== 0) {
            shell.echo('Error: Git pull failed');
            shell.exit(1);
            return
        }else{
            await message.channel.send(`Update downloaded.`)
        }
        await message.channel.send('Restarting...');
        shell.exec('pm2 restart orange');
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }