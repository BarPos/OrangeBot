const util = require('util');
const {emoji, Discord, version} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs');
const fs = require('fs')
const path = require('path');

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

        var updateText = `ㅤ\n${emoji('785598436854464596')} **Cheking For Updates...**`;

        var embed = new Discord.MessageEmbed()
            .setTitle(`${emoji('785598322768871495')} Update`)
            .setColor(config.color)
            .setDescription(updateText)
            .setTimestamp()
        const m = await message.channel.send(embed)
        const {stdout, stderr, code} = shell.exec('git pull https://github.com/BarPos/OrangeBot.git');
        // if (stderr) {
        //     await message.channel.send(`${stderr.slice(41)}${stdout}`);
        //     return
        // }else{

        updateText = updateText + `\`\`\`${stdout}\`\`\``;

        embed.setDescription(updateText);

        await m.edit(embed)
        if(stdout == 'Already up to date.'){
            return;
        }
        // }

        updateText = updateText + `\n\n${emoji('785598364095741972')} **Installing Dependencies...**`

        embed.setDescription(updateText);

        await m.edit(embed)

        const npm = shell.exec('npm i');

        updateText = updateText + `\`\`\`${npm.stdout}\`\`\``

        embed.setDescription(updateText);

        await m.edit(embed)

        if(npm.code !== 0){
            return
        }

        updateText = updateText + `\n\n${emoji('785602068538195988')} **Restarting...**`

        embed.setDescription(updateText);

        await m.edit(embed)

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
            "log":"${updateText.replace(/(\r\n|\n|\r)/gm,`<br>`)}"
        }`

        // (/(\r\n|\n|\r)/gm,"<br>")

        fs.writeFile(p, save, (err) => {
            if (err) return console.log(err);
        });

        shell.exec('pm2 restart orange');
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }