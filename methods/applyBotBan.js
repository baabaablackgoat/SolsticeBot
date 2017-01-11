//Applies botbans to users. 
module.exports = function(msg,mention,time) {
    const addBotBan = require("./addBotBan");
    const userlist = require("./../data/userlist.json");
    if (mention) {
        if (!mention.startsWith("<@")) {
            return ("You asked me to botban someone, but you didn't provide a valid mention. Did the user leave the Guild?");
        } else {
            let bannedUser = mention.substring(3, mention.length - 1);
            if (userlist.mods.hasOwnProperty(bannedUser) && userlist.mods[bannedUser].access >= settings.ban_immunity) {
                return ("The user you tried to ban is immune!");
            }
            if (!time) {
                time = settings.default_bantime;
            }
            if (time === "never") {
                addBotBan(msg,bannedUser, "never");
                return ("The user with the ID " + bannedUser + " has been permanently botbanned.");
            } else if (time.endsWith("s")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setSeconds(expirytime.getSeconds() + bantime);
                addBotBan(msg,bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("m")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setMinutes(expirytime.getMinutes() + bantime);
                addBotBan(msg,bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("h")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setHours(expirytime.getHours() + bantime);
                addBotBan(msg,bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("d")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setDate(expirytime.getDate() + bantime);
                addBotBan(msg,bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else {
                return ("You asked me to botban the user with the ID " + bannedUser + " for a specific time, but you didn't provide a valid time.");
            }
        }
    } else {
        return ("You asked me to botban someone, but you didn't provide a mention.");
    }
}