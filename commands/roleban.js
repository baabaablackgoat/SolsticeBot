const compareUserAccess = require("./../methods/compareUserAccess");
const getIDfromMention = require("./../methods/getIDfromMention");
module.exports = function(bot,msg,args,options) {
    let mentions = getIDfromMention(msg);
    if (mentions.length < 1) {
        msg.channel.sendMessage("You asked me to roleban someone, but you didn't provide a valid mention.");
        return;
    }
    for (let i=0;i<mentions.length;i++){
        if (mentions[i] === msg.author.id) {
            msg.guild.members.get(mentions[i]).addRole(options.settings.roleban.role);
            msg.channel.sendMessage("You successfully rolebanned yourself. Congratulations, great work. http://i.giphy.com/9uoYC7cjcU6w8.gif");
            return;
        }
        let access = compareUserAccess(msg, msg.author.id, mentions[i], false, true);
        if(access === "err_role") {
            msg.channel.sendMessage("You cannot roleban this user. They have a equal or higher role than you.");
            return;
        } else if (access === "clear") {
            msg.guild.members.get(mentions[i]).addRole(options.settings.roleban.role);
            msg.channel.sendMessage(msg.guild.members.get(mentions[i]).displayName + " has been rolebanned.");
        } else {
            msg.channel.sendMessage("`Internal Error, bug the bot owner or @TrueMGF#0114 about this`");
            console.log("Huh? Something went wrong there. Access Status: "+access);
        }
    }
    
};