const fs = require('fs');
const path = require('path');

const defaultSettings =
`{
    "welcomer":{
        "enabled":false,
        "channel":"",
        "message":"Welcome %USER% to the %SERVER%"
    },
    "leaver":{
        "enabled":false,
        "channel":"",
        "message":"%USER% left the %SERVER%"
    },
    "members":{
        "enabled":false,
        "channel":"",
        "message":"%MEMBERS% Members"
    }
}`;

module.exports.SetGuildSettings = function (guildID, settings) {
    const location = path.join(__dirname, 'settings', `${guildID}.json`);
    const sett = path.join(__dirname, 'settings');

    const jsonData = JSON.stringify(settings);

    if(!fs.existsSync(sett)){
        fs.mkdirSync(sett);
    }

    if(fs.existsSync(location)){
        fs.unlinkSync(location);
    }

    fs.writeFileSync(location, jsonData);
}

module.exports.GetGuildSettings = function (guildID) {
    const location = path.join(__dirname, 'settings', `${guildID}.json`);

    if(fs.existsSync(location)){
        const jsonData = fs.readFileSync(location);

        const data = JSON.parse(jsonData);

        return data;
    }else{
        return JSON.parse(defaultSettings);
    }
}