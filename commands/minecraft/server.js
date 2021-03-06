const https = require('https');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    commands: ['mc-server'],
    expectedArgs: '<ip>',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        //console.log(`https://api.mojang.com/users/profiles/minecraft/${arguments[0]}?at=${Math.floor(+new Date() / 1000)}`)

        var response;
        const embed1 = new MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Loading...`)
            .setTimestamp();
        message.channel.send(embed1).then(resultMessage => {
            https.get(`https://mcapi.xdefcon.com/server/${arguments[0]}/full/json`, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    response = JSON.parse(data);

                    if(response.serverStatus == 'offline'){
                        const embed = new MessageEmbed()
                            .setColor(config.color)
                            .setAuthor(`\`${arguments[0]}\` is offline`)
                            .setTimestamp();

                        resultMessage.edit(`Done`)
                        resultMessage.edit(embed)
                        return
                    }
                    const embed = new MessageEmbed()
                        .setColor(config.color)
                        .addFields(
                            {name: 'IP', value: `\`${arguments[0]}\``},
                            {name: 'Version', value: `\`${response.version}\``},
                            {name: 'Players', value: `\`${response.players}/${response.maxplayers}\``},
                            {name: 'MOTD', value: `\`\`\`${response.motd.text}\`\`\``},
                        )
                        .setTimestamp();

                        // resultMessage.edit(`Done`)
                        resultMessage.edit(embed)
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