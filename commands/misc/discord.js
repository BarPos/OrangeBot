const Discord = require('discord.js');
const config = require('./../../config.json');

module.exports = {
    commands: 'discord',
    //expectedArgs: '<num1> <num2>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const {guild, channel} = message;

        const {name, region, memberCount, owner, afkTimeout} = guild;
        const icon = guild.iconURL();

        //console.log(name, region, memberCount, icon, owner.user.tag);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(name)
            .setThumbnail(icon)
            .addFields(
                { name:`⬖ Region`, value:`\`\`\`${region}\`\`\`` },
                { name:`⬖ Members`, value:`\`\`\`${memberCount}\`\`\`` },
                { name:`⬖ Owner`, value:`\`\`\`${owner.user.tag}\`\`\`` },
                { name:`⬖ AFK Timeout`, value:`\`\`\`${afkTimeout / 60} minute(s)\`\`\`` }
            )
            .setTimestamp()

        channel.send(embed)
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }