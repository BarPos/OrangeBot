const settings = require('./../../settings');
const config = require('./../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'welcomer',
    //expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const s = settings.GetGuildSettings(message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Welcomer`)
            .addFields(
                { name:`⬖ Enabled`, value:`\`\`\`${s.welcomer.enabled}\`\`\`` },
                { name:`⬖ Channel`, value:`<#${s.welcomer.channel}>` },
                { name:`⬖ Message`, value:`\`\`\`${s.welcomer.message}\`\`\`` }
            )
            .setTimestamp()

        message.channel.send(embed)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }