const getMembersfromMention = require("./../methods/getMemberfromMention");
module.exports = function(bot,msg,args,options) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
        msg.channel.sendMessage("You don't have the Kick Members permission.");
        return;
    }
    let members = getMembersfromMention(msg);
    for (let i = 0; i < members.id_list.length; i++) {
        if (members.values[members.id_list[i]].highestRole.position >= msg.member.highestRole.position){
            msg.channel.sendMessage("You cannot kick this user! He is on the same or a higher role!");
            return;
        }
        members.values[members.id_list[i]].kick()
            .then(() => {msg.channel.sendMessage("Time tooooo say goooodbyyyyyeeee...");})
            .catch(err => {
                msg.channel.sendMessage("Something went wrong... Maybe I do not have the permissions to kick this user.");
                console.log(err);
            });
    }
};