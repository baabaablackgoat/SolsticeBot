const compareUserAccess = require("./../methods/compareUserAccess");
const getIDfromMention = require("./../methods/getIDfromMention");
module.exports = function(bot,msg,args,options) {
    if (!options.settings.roleban.enabled) {
        msg.channel.sendMessage("Rolebans have not been enabled. Ask the bot owner to enable them in settings.js.");
    }
    let mentions = getIDfromMention(msg);
    if (mentions.length < 1) {
        msg.channel.sendMessage("You asked me to roleban someone, but you didn't provide a valid mention.");
        return;
    }
    for (let i=0;i<mentions.length;i++){
        if (mentions[i] === msg.author.id) {
            //Self rolebans are pretty much a joke, so they wll never strip roles.
            msg.guild.members.get(mentions[i]).addRole(options.settings.roleban.role);
            msg.channel.sendMessage("You successfully rolebanned yourself. Congratulations, great work. http://i.giphy.com/9uoYC7cjcU6w8.gif");
            return;
        }
        let access = compareUserAccess(msg, msg.author.id, mentions[i], false, true);
        if(access === "err_role") {
            msg.channel.sendMessage("You cannot roleban this user. They have a equal or higher role than you.");
            return;
        } else if (access === "clear") {
            if (options.settings.roleban.strip_roles) {
                const role_list = options.settings.roleban.role_list;
                let temp = msg.guild.members.get(mentions[i]).roles.array();
                let user_roles = [];
                for (let j = 0; j < temp.length; j++) {
                    user_roles.push(temp[j].id);
                }
                if (options.settings.roleban.strip_roles === "whitelist") {
                    for (let k = 0; k < role_list.length; k++) {
                        if (user_roles.indexOf(role_list[k]) > -1) {
                            msg.guild.members.get(mentions[i]).removeRole(role_list[k])
                                .catch(err => {console.log(err)});
                        }
                    }
                } else if (options.settings.roleban.strip_roles === "blacklist") {
                    for (let k = 0; k < user_roles.length; k++) {
                        if (role_list.indexOf(user_roles[k]) === -1) {
                            msg.guild.members.get(mentions[i]).removeRole(user_roles[k])
                                .catch(err => {console.log(err)});
                        }
                    }
                } else {
                    console.log("Error in settings.js! No roles were stripped. Doublecheck your settings!");
                }
            }
            msg.guild.members.get(mentions[i]).addRole(options.settings.roleban.role);
            msg.channel.sendMessage(msg.guild.members.get(mentions[i]).displayName + " has been rolebanned.");
        } else {
            msg.channel.sendMessage("`Internal Error, bug the bot owner or @TrueMGF#0114 about this`");
            console.log("Huh? Something went wrong there. Access Status: "+access);
        }
    }
    
};