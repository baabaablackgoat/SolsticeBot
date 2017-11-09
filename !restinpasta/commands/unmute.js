const userlist = require("./../data/userlist.json");
const fs = require("fs");
const getIDfromMention = require("./../methods/getIDfromMention");

module.exports = function (bot, msg, args, options) {
    let mentions = getIDfromMention(msg);
    if (mentions.length < 1) {
        msg.channel.send("You asked me to unmute someone, but you didn't provide a valid mention.");
        return;
    }
    for (let i = 0; i < mentions.length; i++) {
        if (userlist.muted.hasOwnProperty(mentions[i])){
            if (userlist.muted[mentions[i]].expires > new Date()) {
                userlist.muted[mentions].expires = 0;
                msg.channel.send("The user has been unmuted.");
                fs.writeFileSync('./data/userlist.json', JSON.stringify(userlist, "  ", "  "));
            }
            else {
                msg.channel.send("This user is not muted.");
            }
        } else {
            msg.channel.send("This user is not muted.");
        };
    }
};