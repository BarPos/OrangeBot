const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

const ex = require('./express');

ex();

// ? VERSION
const gen = 'stable' // stable, beta
const version = `${gen}-v1.4.10`
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

function emoji(id){
    return client.guilds.cache.get('785550445653131295').emojis.cache.get(id).toString();
}

module.exports = {client, Discord, version, emoji};

//require('./handlers/message')
require('./handlers/guildMemberAdd')
require('./handlers/guildMemberRemove')

async function updatee(json, p){
    const g = client.guilds.cache.get(json.guild)
    const c = g.channels.cache.get(json.channel)
    var m;
    await c.messages.fetch({around: json.message, limit: 1})
    .then(msg => {
        m = msg.first();
        var updateText = json.log;

        updateText = updateText + `\n\n\n${emoji('785612264727379988')} **Successfuly updated from** \`${json.oldVer}\` **to** \`${version}\``

        const replacer = new RegExp(`<br>`, 'g')

        //console.log(updateText)
        //console.log(updateText.replace(replacer,`\n`))

        const embed = new Discord.MessageEmbed()
            .setTitle(`${emoji('785598322768871495')} Update`)
            .setColor(config.color)
            .setDescription(updateText.replace(replacer,`\n`))
            .setTimestamp()
        m.edit(embed)
    });

    fs.unlink(p, (err) => {
        if (err) {
          console.error(err)
        }
    })
}

client.on('ready', async () => {
    l.log(`Started as "${client.user.tag}"`)

    const p = path.join(__dirname, 'update.json')
    if(fs.existsSync(p)){
        var json;
        await fs.readFile(p, async function read(err, data) {
            if (err) {
                throw err;
            }
            json = JSON.parse(data);
            await updatee(json, p)
        });
    }

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