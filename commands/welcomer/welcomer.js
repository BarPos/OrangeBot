const settings = require('./../../settings');
const config = require('./../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'welcomer',
    //expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        const s = await settings.GetWelcomer(message.guild.id);

        console.log(s);

        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Welcomer`)
            .addFields(
                { name:`⬖ Enabled`, value:`\`\`\`${s.enabled}\`\`\`` },
                { name:`⬖ Channel`, value:`<#${s.channel}>` },
                { name:`⬖ Message`, value:`\`\`\`${s.message}\`\`\`` }
            )
            .setTimestamp()

        message.channel.send(embed)
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }