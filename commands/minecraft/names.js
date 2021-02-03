const https = require('https');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    commands: ['mc-names'],
    expectedArgs: `<uuid (get one using \`${config.prefix}mc-uuid <nick>\`)>`,
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
            https.get(`https://api.mojang.com/user/profiles/${arguments[0]}/names`, (resp) => {
                var data = [];
                resp.on('data', d => data.push(d));

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    //console.log(JSON.parse(data));
                    //console.log(data)

                    // try{
                        //console.log(data.join(''))
                        response = JSON.parse(data.join(''));
                        if(response.error){
                            const embed = new MessageEmbed()
                                .setColor(config.color)
                                .setAuthor(`\`${arguments[0]}\` is not a valid Minecraft uuid (get one using \`${config.prefix}mc-uuid\`)`)
                                .setTimestamp();

                            resultMessage.edit(`Done`)
                            resultMessage.edit(embed)
                            return
                        }

                        const namesH = response.reverse()

                        var fields = [];

                        namesH.forEach((n, i) => {
                            if(n.changedToAt){
                                let date = new Date(n.changedToAt)
                                fields[i] = { name: `Name: \`${n.name}\``, value: `Changed at: \`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}\``, inline: false };
                            }else{
                                fields[i] = { name: `Name: \`${n.name}\``, value: `Changed at: \`-\``, inline: false };
                            }
                        });

                        const embed = new MessageEmbed()
                            .setColor(config.color)
                            .addFields(fields)
                            .setTimestamp();

                        //resultMessage.edit(`Done`)
                        resultMessage.edit(embed)
                    // }catch(e){
                    //     const embed = new MessageEmbed()
                    //         .setColor(config.color)
                    //         .setAuthor(`\`${arguments[0]}\` is not a valid Minecraft uuid (get one using \`${config.prefix}uuid\`) debug 01`)
                    //         .setTimestamp();

                    //     resultMessage.edit(`Done`)
                    //     resultMessage.edit(embed)
                    // }


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