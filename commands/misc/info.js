const {MessageEmbed} = require('discord.js');
const {client, version} = require('../../index');
const config = require('../../config.json')

module.exports = {
    commands: ['info', 'about'],
    //expectedArgs: '<num1> <num2>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const embed = new MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Information about the ${client.user.username} Bot`, client.user.displayAvatarURL())
            .addFields(
                {name: `⬖ Guild Count`, value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true},
                {name: `⬖ User Count`, value: `\`\`\`${client.users.cache.size}\`\`\``, inline: true},
                {name: `⬖ Channel Count`, value: `\`\`\`${client.channels.cache.size}\`\`\``, inline: true},
                {name: `⬖ Version`, value: `\`\`\`${version}\`\`\``, inline: true},
                {name: `⬖ Author`, value: `\`\`\`@BarPos.exe#3404\`\`\``, inline: false},
            )

        message.channel.send(embed);
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }