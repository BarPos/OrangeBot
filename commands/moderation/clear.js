module.exports = {
    commands: ['clear'],
    expectedArgs: '<number of messages (default 5)>',
    permissionError: 'You need MANAGE_MESSAGES permission to run this command',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text, client) => {
        var del = 0;

        if(!arguments[0]){
            del = 5
        }else{
            if(typeof Number(arguments[0]) == "number"){
                del = Number(arguments[0])
            }else{
                message.reply(`\`${arguments[0]}\` is not a number!`)
                return
            }
        }

        message.channel.bulkDelete(del+1)
    },
    permissions: 'MANAGE_MESSAGES',
    //requiredRoles: [],
    //allowedUsers: '437992463165161472'
  }