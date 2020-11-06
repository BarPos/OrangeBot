const util = require('util');

module.exports = {
    commands: 'eval',
    expectedArgs: '<eval>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    //maxArgs: 0,
    callback: (message, arguments, text, client) => {
        try {
            const toEval = text;
            const evaluated = eval(toEval);

            const evalEmbed = {
                color: 0x0099ff,
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
                color: 0x0099ff,
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