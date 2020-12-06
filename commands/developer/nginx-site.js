const util = require('util');
const {client, Discord} = require('../../index');
const config = require('../../config.json')
const shell = require('shelljs')

module.exports = {
    commands: 'nginx-site',
    expectedArgs: '<start / stop> <name>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: async (message, arguments, text, client) => {
        if(!arguments[1]) return message.channel.send(`Syntax error! Ussage: \`${config.prefix}nginx-site <start / stop> <name>\``);
        if(arguments[0]){
            if(arguments[0] == 'start'){
                const s = await shell.exec(`mv /etc/nginx/sites-available/${arguments[1]} /etc/nginx/sites-enabled/${arguments[1]}`)
                const ss = await shell.exec(`systemctl reload nginx`);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Starting Site`, client.user.displayAvatarURL())
                    .setColor(config.color)
                    .setDescription(`${s.stdout} ${s.stderr} \n${ss.stdout} ${ss.stderr}`)
                    .setTimestamp()
                return await message.channel.send(embed);
            }else if(arguments[0] == 'stop'){
                const s = await shell.exec(`mv /etc/nginx/sites-enabled/${arguments[1]} /etc/nginx/sites-available/${arguments[1]}`)
                const ss = await shell.exec(`systemctl reload nginx`);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Starting Site`, client.user.displayAvatarURL())
                    .setColor(config.color)
                    .setDescription(`${s.stdout} ${s.stderr} \n${ss.stdout} ${ss.stderr}`)
                    .setTimestamp()
                return await message.channel.send(embed);
            }else{
                message.channel.send(`Syntax error! Ussage: \`${config.prefix}nginx-site <start / stop> <name>\``);
            }
        }else{
            message.channel.send(`Syntax error! Ussage: \`${config.prefix}nginx-site <start / stop> <name>\``);
        }
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }