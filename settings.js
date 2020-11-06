const fs = require('fs');
const path = require('path');

const defaultSettings =
`{
    "welcomer":{
        "enabled":false,
        "channel":"",
        "message":"Welcome %USER% to the %SERVER%"
    }
}`;

module.exports.SetGuildSettings = function (guildID, settings) {
    const location = path.join(__dirname, 'settings', `${guildID}.json`);

    const jsonData = JSON.stringify(settings);

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