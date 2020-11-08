const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');

client.on('guildMemberRemove', async (member) => {
    //console.log('member joined')
    const user = member.user;

    const s = settings.GetGuildSettings(member.guild.id)

    if(s.welcomer.enabled == true){
        const channel = member.guild.channels.cache.get(s.leaver.channel);
        if(channel){
            var welcomeMessage = s.leaver.message;

            welcomeMessage = welcomeMessage.replace('%USER%', `**${user.username}**`).replace('%SERVER%', `**${member.guild.name}**`);

            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(welcomeMessage)
                .setThumbnail(user.avatarURL())
                .setTimestamp()

            channel.send(embed);
        }else{
            s.leaver.enabled = false;
            settings.SetGuildSettings(member.guild.id, s);
        }
    }
});