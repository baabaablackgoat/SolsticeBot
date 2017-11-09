const givemes = require("./../data/givemes");
const givemeKeys = Object.keys(givemes);
const getInfo = function (input) {
    for (let i=0;i<givemeKeys.length;i++) {
        if (givemes[givemeKeys[i]].aliases.indexOf(input.toLowerCase()) > -1) {
            return givemes[givemeKeys[i]];
        }
    }
    return false;
};
module.exports = function (bot,msg,args,options) {
    let data = getInfo(args[0]);
    if (data) {
        if (data.requires.role) {
            
        }
        if (data.requires.time) {

        }

    } else {
        msg.channel.send("There is no giveme with the name `"+args[0]+"`.");
    }
};