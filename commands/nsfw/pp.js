const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = {
    commands: ['pp'],
    expectedArgs: '<user>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        var user;
        if(message.mentions.users.first()){
            user = message.mentions.users.first();
        }else {
            user = message.member.user;
        }

        if(user.id == '769630010020593674') {
            message.channel.send('I do not have a pp, i am a bot.')
            return
        }

        var size = randomInt(0, 10);

        if(user.id == '437992463165161472') size = 12;
        if(user.id == '482864844823986177') size = 11;
        if(user.id == '407192478417027085') size = 1;
        if(user.id == '484298675896713216') size = 1;

        var pp = '8';

        for(var i = 0; i < size; i++){
            pp = pp + '=';
        }
        pp = pp + 'D';

        const embed = new MessageEmbed()
            .setColor(config.color)
            .setTitle(`${user.username}'s pp:`)
            .setDescription(`\`\`\`${pp}\`\`\``)
            .setTimestamp()

        message.channel.send(embed)
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}