const https = require('https');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    commands: ['mc-uuid'],
    expectedArgs: '<nick>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        //console.log(`https://api.mojang.com/users/profiles/minecraft/${arguments[0]}?at=${Math.floor(+new Date() / 1000)}`)

        var response;
        message.channel.send('Loading...').then(resultMessage => {
            https.get(`https://api.mojang.com/users/profiles/minecraft/${arguments[0]}?at=${Math.floor(+new Date() / 1000)}`, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    //console.log(JSON.parse(data));
                    //console.log(data)

                    try{
                        response = JSON.parse(data);
                        const embed = new MessageEmbed()
                            .setColor(config.color)
                            .setAuthor(`${response.name}'s uuid is:`)
                            .setDescription(`\`\`\`${response.id}\`\`\``)
                            .setTimestamp();

                        resultMessage.edit(`Done`)
                        resultMessage.edit(embed)
                    }catch(e){
                        const embed = new MessageEmbed()
                            .setColor(config.color)
                            .setAuthor(`\`${arguments[0]}\` is not a valid Minecraft nickname`)
                            .setTimestamp();

                        resultMessage.edit(`Done`)
                        resultMessage.edit(embed)
                    }


            });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        });
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }