const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');

module.exports.UpdateMembers = (member) => {
    const s = settings.GetGuildSettings(member.guild.id)
    //console.log('1')


    if(s.members.enabled == true){
        //console.log('2')
        const channel = member.guild.channels.cache.get(s.members.channel);
        //channel.setName('Updating...')
        if(channel){
            var welcomeMessage = s.members.message;
            //console.log('3')

            //console.log(member.guild.memberCount.toLocaleString())
            welcomeMessage = welcomeMessage.replace('%MEMBERS%', `${member.guild.memberCount.toLocaleString()}`);

            //console.log(welcomeMessage)
            channel.edit({ name: welcomeMessage}).then(() => {
                //console.log('4')
            })
        }else{
            s.members.enabled = false;
            settings.SetGuildSettings(member.guild.id, s);
        }
    }
}