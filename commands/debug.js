const getIDfromMention = require("./../methods/getIDfromMention");
module.exports = function (bot, msg, args, options) {
    msg.channel.sendCode("js", "//Debug function executed");
    if (getIDfromMention(msg).length > 0){
        console.log("true");
    } else {
        console.log("false");
    }
};