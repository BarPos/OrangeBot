const {client} = require('../index');
const config = require("../config.json");
const settings = require('../settings');
const Discord = require('discord.js');

const isInvite = async (guild, code) => {
    guild.fetchInvites().then(async invites => {
        return await new Promise(resolve => {
            for(const invite of invites){
                console.log(invite);
            }
        });
    });
}

client.on('message', message => {
    const { guild, member, content } = message;

    if(content.includes('discord.gg/')){
        isInvite(guild, '')
    }
});