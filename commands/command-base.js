const { prefix } = require('../config.json')
const l = require('../logs');
const { Discord } = require('../index')
const config = require('../config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
        throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You need %PERMISSION% permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        botPermissions = [],
        requiredRoles = [],
        allowedUsers = null,
        callback,
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    l.log(`Registering command "${commands[0]}"`)

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }
    if(botPermissions.length) {
        if (typeof botPermissions === 'string') {
            botPermissions = [botPermissions]
        }

        validatePermissions(botPermissions)
    }else{
        botPermissions = permissions;
    }

    // Ensure the allowedUsers are in an array
    if(allowedUsers !== null){
        if (allowedUsers.length) {
            if (typeof allowedUsers === 'string') {
                allowedUsers = [allowedUsers]
            }
        }
    }

    // Listen for messages
    client.on('message', async (message) => {
        const { member, content, guild } = message

        for (const alias of commands) {
            const command = `${prefix}${alias.toLowerCase()}`

            if (
                content.toLowerCase().startsWith(`${command} `) ||
                content.toLowerCase() === command
            ) {
                // A command has been ran

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        if(member.user.id !== '437992463165161472'){
                            message.reply(permissionError.replace(`%PERMISSION%`, permission))
                            return
                        }
                    }
                }

                // Ensure the user has the required permissions

                if(allowedUsers !== null){
                    const user = member.user;
                    if (!containsObject(user.id, allowedUsers)) {
                        message.reply(`too bad i will not do that.`)
                        return
                    }
                }

                const bot = message.guild.members.cache.get(client.user.id);
                await botPermissions.forEach(async (p) => {
                    if(!bot.hasPermission(p)){
                        const embed = await new Discord.MessageEmbed()
                            .setColor(config.color)
                            .setTitle(`I'm missing \`${p}\` permission!`)
                            .setDescription('You have to give me this permission to do that. You can give me admin perms so you don\'t need to do this in the future (tutorial below).')
                            .setImage('https://i.imgur.com/sfHXq9b.png')
                            .setFooter('Please contact server administrator and ask to fix it.')
                            .setTimestamp()
                        return await message.channel.send(embed)
                    }
                });

                // Ensure the user has the required roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(
                        (role) => role.name === requiredRole
                    )

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(
                        `You must have the "${requiredRole}" role to use this command.`
                        )
                        return
                    }
                }

                // Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                // Remove the command which is the first index
                arguments.shift()

                // Ensure we have the correct number of arguments
                if (
                    arguments.length < minArgs ||
                    (maxArgs !== null && arguments.length > maxArgs)
                    ) {
                    message.reply(
                        `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
                    )
                    return
                }

                // Handle the custom command code
                callback(message, arguments, arguments.join(' '), client)

                return
            }
        }
    })
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}