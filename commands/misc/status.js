const { Discord } = require("../../index")

module.exports = {
    commands: 'status',
    //expectedArgs: '',
    //permissionError: 'You need admin permissions to run this command',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Servers Status`, client.user.displayAvatarURL())
            .setColor(config.color)
            .setDescription(`You can check services status [here](https://status.barpos.net/)`)
            .setTimestamp()
        await message.channel.send(embed)
    },
    //permissions: '',
    //requiredRoles: [],
    //allowedUsers: []
  }