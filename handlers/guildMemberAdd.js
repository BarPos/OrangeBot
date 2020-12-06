const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');
const members = require('../other/updateMembers')

client.on('guildMemberAdd', async (member) => {
    //console.log('member joined')
    const s = await settings.GetWelcomer(member.guild.id)

    if(s.enabled == true){
        const channel = member.guild.channels.cache.get(s.channel);
        if(channel){
            var welcomeMessage = s.message;

            welcomeMessage = welcomeMessage.replace('%USER%', `**${member.user.username}**`).replace('%SERVER%', `**${member.guild.name}**`);

            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(welcomeMessage)
                .setThumbnail(member.user.avatarURL())
                .setTimestamp()

            channel.send(embed);
        }else{
            s.welcomer.enabled = false;
            await settings.SaveWelcomer(member.guild.id, s.enabled, s.channel, s.message);
        }
    }

    members.UpdateMembers(member)
});