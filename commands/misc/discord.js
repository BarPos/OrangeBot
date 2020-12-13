const Discord = require('discord.js');
const config = require('./../../config.json');

module.exports = {
    commands: ['server'],
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
                { name:`⬖ Id`, value:`\`\`\`${guild.id}\`\`\``, inline: true},
                { name:`⬖ Region`, value:`\`\`\`${region}\`\`\``, inline: true},
                { name:`⬖ Created`, value:`\`\`\`${guild.createdAt}\`\`\``, inline: true},
                { name:`⬖ Members`, value:`\`\`\`${memberCount}\`\`\``, inline: true},
                { name:`⬖ Owner`, value:`\`\`\`${owner.user.tag}\`\`\``, inline: true},
                { name:`⬖ Emojis`, value:`\`\`\`${guild.emojis.cache.size}\`\`\``, inline: true},
                { name:`⬖ Roles`, value:`\`\`\`${guild.roles.cache.size}\`\`\``, inline: true},
                { name:`⬖ Verification Level`, value:`\`\`\`${guild.verificationLevel}\`\`\``, inline: true},
                { name:`⬖ Verificated`, value:`\`\`\`${guild.verified}\`\`\``, inline: true},
                { name:`⬖ Partnered`, value:`\`\`\`${guild.partnered}\`\`\``, inline: true},
                { name:`⬖ Preferred Locale`, value:`\`\`\`${guild.preferredLocale}\`\`\``, inline: true},
                { name:`⬖ Boosts`, value:`\`\`\`${guild.premiumSubscriptionCount}\`\`\``, inline: true},
                { name:`⬖ Boost Level`, value:`\`\`\`${guild.premiumTier}\`\`\``, inline: true},
                { name:`⬖ Text Channels`, value:`\`\`\`${guild.channels.cache.filter(channel => channel.type === 'text').size}\`\`\``, inline: true},
                { name:`⬖ Voice Channels`, value:`\`\`\`${guild.channels.cache.filter(channel => channel.type === 'voice').size}\`\`\``, inline: true},
                { name:`⬖ Categories`, value:`\`\`\`${guild.channels.cache.filter(channel => channel.type === 'category').size}\`\`\``, inline: true},
                { name:`⬖ AFK Timeout`, value:`\`\`\`${afkTimeout / 60} minute(s)\`\`\``, inline: true}
            )
            .setTimestamp()

        channel.send(embed)
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }