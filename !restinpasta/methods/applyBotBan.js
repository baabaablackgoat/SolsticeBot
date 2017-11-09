//Applies botbans to users. 
const addBotBan = require("./addBotBan");
const userlist = require("./../data/userlist.json");
const compareUserAccess = require("./../methods/compareUserAccess");

module.exports = function (msg, mention, time, options) {
    if (mention.length > 0) {
        for(let i=0; i<mention.length; i++){
            let bannedUser = mention[i];
            if (compareUserAccess(msg, msg.author.id,mention[i],true,true) !== "clear") {
                msg.channel.send("The user you tried to botban has a equal/higher role or access level than you!");
                return;
            }
            if (userlist.mods.hasOwnProperty(bannedUser) && userlist.mods[bannedUser].access >= options.settings.ban_immunity) {
                msg.channel.send("The user you tried to ban is immune!");
                return;
            }
            if (!time) {
                time = options.settings.default_bantime;
            }
            if (time === "never") {
                addBotBan(msg, bannedUser, "never");
                msg.channel.send("The user with the ID " + bannedUser + " has been permanently botbanned.");
            } else if (time.endsWith("s")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setSeconds(expirytime.getSeconds() + bantime);
                addBotBan(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("m")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setMinutes(expirytime.getMinutes() + bantime);
                addBotBan(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("h")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setHours(expirytime.getHours() + bantime);
                addBotBan(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("d")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));

                expirytime.setDate(expirytime.getDate() + bantime);
                addBotBan(msg, bannedUser, expirytime.getTime());

                msg.channel.send("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else {
                msg.channel.send("You asked me to botban the user with the ID " + bannedUser + " for a specific time, but you didn't provide a valid time.");
            }
        }
    } else {
        msg.channel.send("You asked me to botban someone, but you didn't provide a valid mention.");
    }
};