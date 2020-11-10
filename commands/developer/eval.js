const util = require('util');
const {client} = require('../../index');
const config = require('../../config.json')

module.exports = {
    commands: 'eval',
    expectedArgs: '<eval>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    //maxArgs: 0,
    callback: (message, arguments, text, client) => {
        const toEval = text;
        var evaluated;
        try {
            evaluated = eval(toEval);

            const evalEmbed = {
                color: config.color,
                title: 'Code Evalutation',
                description: 'Evaluates the code - for developers only',
                fields: [
                    {
                        name: ':inbox_tray: Input',
                        value: `\`\`\`js\n${text}\`\`\``,
                    },
                    {
                        name: ':outbox_tray: Output',
                        value: `\`\`\`js\n${util.inspect(evaluated, { depth: 0 })}\`\`\``,
                    },
                ],
            };

            message.channel.send({ embed: evalEmbed })

        } catch(e) {
            const evalErrorEmbed = {
                color: config.color,
                title: 'Code Evalutation',
                description: 'Evaluates the code - for developers only',
                fields: [
                    {
                        name: ':inbox_tray: Input',
                        value: `\`\`\`js\n${text}\`\`\``,
                    },
                    {
                        name: ':outbox_tray: Output',
                        value: `\`\`\`js\n${util.inspect(evaluated, { depth: 0 })}\`\`\``,
                    },
                ],
            };

            message.channel.send({ embed: evalErrorEmbed });
        }
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: '437992463165161472'
  }