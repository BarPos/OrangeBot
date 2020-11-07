const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const settings = require('./settings')

module.exports = {client};

const config = require('./config.json')
const l = require('./logs');

fs.readdir(path.join(__dirname, 'handlers'), (err, files) => {
    if (err) l.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) return console.log("There are no events to load...");
    l.log(`Loading ${jsfiles.length} events...`);
    jsfiles.forEach((f, i) => {
        require(`./handlers/${f}`);
        l.log(`${i + 1}: ${f} loaded!`);
    });
});

client.on('ready', async () => {
    l.log(`Started as "${client.user.tag}"`)

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

    client.user.setPresence({
        activity: {
            name: `${config.prefix}help for help`,
        },
    });
})

client.login(config.token)