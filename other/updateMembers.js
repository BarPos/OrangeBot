const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');

module.exports.UpdateMembers = (member) => {
    const s = settings.GetGuildSettings(member.guild.id)


    if(s.members.enabled == true){
        const channel = member.guild.channels.cache.get(s.members.channel);
        channel.setName('Updating...')
        if(channel){
            var welcomeMessage = s.members.message;

            //console.log(member.guild.memberCount.toLocaleString())
            welcomeMessage = welcomeMessage.replace('%MEMBERS%', `${member.guild.memberCount.toLocaleString()}`);

            //console.log(welcomeMessage)
            channel.setName(welcomeMessage)
        }else{
            s.members.enabled = false;
            settings.SetGuildSettings(member.guild.id, s);
        }
    }
}