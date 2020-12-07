const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const ex = require('./express');

ex();

// ? VERSION
const version = 'stable-v1.4.9.5'
// ? ###

const l = require('./logs');

const mongoose = require('mongoose');

const config = require('./config.json')

mongoose.connect(config.db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        l.log('Connected to db!');
    })

const settings = require('./settings')

module.exports = {client, Discord, version};

//require('./handlers/message')
require('./handlers/guildMemberAdd')
require('./handlers/guildMemberRemove')

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
            name: `${config.prefix}help | ${version}`,
        },
    });

    setInterval(() => {
        client.user.setPresence({
            activity: {
                name: `${config.prefix}help | ${version}`,
            },
        });
    }, 1000*60*30)
})

client.login(config.token)