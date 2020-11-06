const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');

client.on('guildMemberAdd', async (member) => {
    //console.log('member joined')
    const s = settings.GetGuildSettings(member.guild.id)

    if(s.welcomer.enabled == true){
        const channel = member.guild.channels.cache.get(s.welcomer.channel);
        if(channel){
            var welcomeMessage = s.welcomer.message;

            welcomeMessage = welcomeMessage.replace('%USER%', `*${member.user.username}*`).replace('%SERVER%', `**${member.guild.name}**`);

            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(welcomeMessage)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()

            channel.send(embed);
        }else{
            s.welcomer.enabled = false;
            settings.SetGuildSettings(member.guild.id, s);
        }
    }
});