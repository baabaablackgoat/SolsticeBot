const applyMute = require("./../methods/applyMute");
const getIDfromMention = require("./../methods/getIDfromMention");

module.exports = function (bot, msg, args, options) {
    let mentions = getIDfromMention(msg);
    let args_offset = mentions.length;
    applyMute(msg, mentions, args[args_offset], options);
};