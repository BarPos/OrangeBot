module.exports = {
    commands: ['cc'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text, client) => {
        message.channel.send(`\`${message.member.user.username}@${message.guild.name}:/root/orange$ Running "clearchat.sh"\``)
        const str = `\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\`
\`${message.member.user.username}@${message.guild.name}:/root/orange$ ~\``
        message.channel.send(str)
        message.channel.send(str)
        message.channel.send(str)
        message.channel.send(str)
    },
    //permissions: 'ADMINISTRATOR',
    //requiredRoles: [],
    allowedUsers: ['437992463165161472','482864844823986177']
  }