const settings = require('./../../settings');
const config = require('./../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'leaver',
    //expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const s = settings.GetGuildSettings(message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Leaver`)
            .addFields(
                { name:`⬖ Enabled`, value:`\`\`\`${s.leaver.enabled}\`\`\`` },
                { name:`⬖ Channel`, value:`<#${s.leaver.channel}>` },
                { name:`⬖ Message`, value:`\`\`\`${s.leaver.message}\`\`\`` }
            )
            .setTimestamp()

        message.channel.send(embed)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }