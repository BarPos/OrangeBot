const fs = require('fs');
const path = require('path');

const Welcomer = require('./models/Welcomer');
const Leaver = require('./models/Leaver');

// ? WELCOMER

module.exports.SaveWelcomer = async function (guildId, enabled, channel, message) {
    const guildExists = await Welcomer.findOne({id: guildId});
    if(guildExists) {
        Welcomer.findOne({id: guildId}, function(err, doc) {
            if (err)
            {
                console.error(err)
            }
            else
            {
                doc.enabled = enabled;
                doc.channel = channel;
                doc.message = message;
                doc.save(function (err) {
                    if (err)
                    {
                        console.log(err)
                    }
                });
            }
        })
    }else{
        const welcomer = new Welcomer({
            id: guildId,
            enabled: enabled,
            channel: channel,
            message: message
        });
        try{
            const savedWelcomer = await welcomer.save()
        }catch(err){
            console.error(err)
        }
    }
}

module.exports.GetWelcomer = async function (guildId) {
    const guildExists = await Welcomer.findOne({id: guildId});
    //console.log('start')
    if(guildExists) {
        //console.log('exists')
        return await Welcomer.findOne({id: guildId});
    }else {
        //console.log('not exists')
        return {"enabled": false, "channel": '', "message": "Welcome %USER% to the %SERVER%"};
    }
}


// ? LEAVER

module.exports.SaveLeaver = async function (guildId, enabled, channel, message) {
    const guildExists = await Leaver.findOne({id: guildId});
    if(guildExists) {
        Leaver.findOne({id: guildId}, function(err, doc) {
            if (err)
            {
                console.error(err)
            }
            else
            {
                doc.enabled = enabled;
                doc.channel = channel;
                doc.message = message;
                doc.save(function (err) {
                    if (err)
                    {
                        console.log(err)
                    }
                });
            }
        })
    }else{
        const leaver = new Leaver({
            id: guildId,
            enabled: enabled,
            channel: channel,
            message: message
        });
        try{
            const savedleaver = await leaver.save()
        }catch(err){
            console.error(err)
        }
    }
}

module.exports.GetLeaver = async function (guildId) {
    const guildExists = await Leaver.findOne({id: guildId});
    //console.log('start')
    if(guildExists) {
        //console.log('exists')
        return await Leaver.findOne({id: guildId});
    }else {
        //console.log('not exists')
        return {"enabled": false, "channel": '', "message": "%USER% left the %SERVER%"};
    }
}