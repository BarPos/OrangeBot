const config = require('./../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'ban',
    expectedArgs: '<@user> <reason>',
    permissionError: 'You need ban permissions to run this command',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text, client) => {
        const {member, mentions} = message;

        const target = mentions.users.first();
        if(target){
            const targetMember = message.guild.members.cache.get(target.id);

            const args = arguments;
            args.shift()
            const banned = target;

            if(targetMember.bannable){
                targetMember.ban({ reason: args.join(' ') })

                const embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`\`${banned.tag}\` have been banned for \`${args.join(' ')}\`.`)
                    .setTimestamp()
                message.channel.send(embed)
            }else{
                const embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`You can not ban \`${banned.tag}\`.`)
                    .setTimestamp()
                message.channel.send(embed)
            }

        }else{
            message.channel.send(`<@${member.id}> Please specify someone to ban.`);
        }
    },
    permissions: 'BAN_MEMBERS',
    requiredRoles: [],
    allowedUsers: ''
  }