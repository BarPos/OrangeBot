const util = require('util');
const {client, Discord} = require('../../index');
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
        const m = await message.channel.send(`Downloading Update...`)
        const {stdout, stderr, code} = shell.exec('git pull https://github.com/BarPos/OrangeBot.git');
        // if (stderr) {
        //     await message.channel.send(`${stderr.slice(41)}${stdout}`);
        //     return
        // }else{
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Update`, client.user.displayAvatarURL())
            .setColor(config.color)
            .setDescription(stdout)
            .setTimestamp()
        await m.edit(embed)
        if(code !== 0){
            return;
        }
        // }
        const mm = await message.channel.send('Installing dependencies...');
        const {stdoutt, stderrr, codee} = shell.exec('npm i');
        const embedd = new Discord.MessageEmbed()
            .setAuthor(`Dependencies`, client.user.displayAvatarURL())
            .setColor(config.color)
            .setDescription(`${stdoutt} ${stderrr}`)
            .setTimestamp()
        await mm.edit(embed)
        if(codee !== 0){
            return;
        }
        await message.channel.send('Restarting...');
        shell.exec('pm2 restart orange');
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }