const fs = require('fs');

module.exports.log = function (log) {
    let date_ob = new Date();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    var log = `[${hours}:${minutes}:${seconds}, Log] ${log}`

    console.log(log);

    fs.appendFileSync('log.txt', log + "\n");
};

module.exports.error = function (log) {
    let date_ob = new Date();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    var log = `[${hours}:${minutes}:${seconds}, Error] ${log}`

    console.log(log);

    fs.appendFileSync('log.txt', log + "\n");
};

module.exports.nl = function () {
    fs.appendFileSync('log.txt', "\n");
};