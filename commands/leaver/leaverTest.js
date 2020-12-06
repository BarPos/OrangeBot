const settings = require('../../settings');
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    commands: 'l-test',
    //expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        client.emit("guildMemberRemove", message.member);
    },
    permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    //allowedUsers: ''
  }