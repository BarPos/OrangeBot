const help = require('./../../help.json');
const config = require('./../../config.json');
const { Discord, emoji}  = require('../../index');

module.exports = {
    commands: 'help',
    //expectedArgs: '',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        var embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`${emoji('785551105718616094')} Orange's Help`)
            .setThumbnail()
            //.setDescription(`BOT IS IN BETA! ALL SERVER SETTINGS MAY RESET!`)

        for(const category of help){
            var commands = '';

            for(const command of category.content){
                commands = commands + `\`${command.name}\`  `
            }

            embed.addFields({"name":`⬖ ${category.name}`, "value":commands})
        }

        embed.addField('ㅤ', 'For more support join [https://discord.gg/ccYm3JN](https://discord.gg/ccYm3JN)')

        message.channel.send(embed);
    },
    //permissions: '',
    //requiredRoles: [],
    //allowedUsers: []
  }