const settings = require('./../../settings');
const config = require('./../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'members',
    //expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const s = settings.GetGuildSettings(message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Members`)
            .addFields(
                { name:`⬖ Enabled`, value:`\`\`\`${s.members.enabled}\`\`\`` },
                { name:`⬖ Channel`, value:`<#${s.members.channel}>` },
                { name:`⬖ Message`, value:`\`\`\`${s.members.message}\`\`\`` }
            )
            .setTimestamp()

        message.channel.send(embed)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }