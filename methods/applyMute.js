//Yes, this is pretty much ApplyBotBan - just with other values.

const addMute = require("./addMute");
const userlist = require("./../data/userlist.json");
const compareUserAccess = require("./../methods/compareUserAccess");

module.exports = function (msg, mention, time, options) {
    if (mention.length > 0) {
        for(let i=0; i<mention.length; i++){
            let bannedUser = mention[i];
            if (compareUserAccess(msg, msg.author.id,mention[i],true,true) !== "clear") {
                msg.channel.send("The user you tried to mute has a equal/higher role or access level than you!");
                return;
            }
            if (userlist.mods.hasOwnProperty(bannedUser) && userlist.mods[bannedUser].access >= options.settings.ban_immunity) {
                msg.channel.send("The user you tried to mute is immune!");
                return;
            }
            if (!time) {
                time = options.settings.default_mutetime;
            }
            if (time === "never") {
                addMute(msg, bannedUser, "never");
                msg.channel.send("The user with the ID " + bannedUser + " has been permanently muted.");
            } else if (time.endsWith("s")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setSeconds(expirytime.getSeconds() + bantime);
                addMute(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been muted for " + time);
            } else if (time.endsWith("m")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setMinutes(expirytime.getMinutes() + bantime);
                addMute(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been muted for " + time);
            } else if (time.endsWith("h")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setHours(expirytime.getHours() + bantime);
                addMute(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been muted for " + time);
            } else if (time.endsWith("d")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setDate(expirytime.getDate() + bantime);
                addMute(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been muted for " + time);
            } else {
                msg.channel.send("You asked me to mute the user with the ID " + bannedUser + " for a specific time, but you didn't provide a valid time.");
            }
        }
    } else {
        msg.channel.send("You asked me to mute someone, but you didn't provide a valid mention.");
    }
};