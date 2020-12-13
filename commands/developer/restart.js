const util = require('util');
const {emoji, Discord, version} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs');
const fs = require('fs')
const path = require('path');

module.exports = {
    commands: 'restart',
    expectedArgs: '<eval>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        var updateText = `ㅤ\n${emoji('785602068538195988')} **Restarting...**`;

        var embed = new Discord.MessageEmbed()
            .setTitle(`${emoji('786219619378921523')} Restart`)
            .setColor(config.color)
            .setDescription(updateText)
            .setTimestamp()
        const m = await message.channel.send(embed)

        const p = path.join(__dirname, '..', '..', 'update.json');
        //console.log(p)
        if(fs.existsSync(p)){
            fs.unlink(p, (err) => {
                if (err) {
                  console.error(err)
                }
            })
        }

        const save = `{
            "oldVer":"${version}",
            "channel":"${m.channel.id}",
            "guild":"${m.guild.id}",
            "message":"${m.id}",
            "log":"${updateText.replace(/(\r\n|\n|\r)/gm,`<br>`)}",
            "restart":true
        }`

        // (/(\r\n|\n|\r)/gm,"<br>")

        await fs.writeFileSync(p, save, (err) => {
            if (err) return console.log(err);
        });

        shell.exec('pm2 restart orange');
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }