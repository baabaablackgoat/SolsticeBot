const getMembersfromMention = require("./../methods/getMemberfromMention");
module.exports = function(bot,msg,args,options) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
        msg.channel.send("You don't have the Kick Members permission.");
        return;
    }
    let members = getMembersfromMention(msg);
    for (let i = 0; i < members.id_list.length; i++) {
        if (members.values[members.id_list[i]].highestRole.position >= msg.member.highestRole.position){
            msg.channel.send("You cannot kick this user! He is on the same or a higher role!");
            return;
        }
        members.values[members.id_list[i]].kick()
            .then(() => {msg.channel.send("Time tooooo say goooodbyyyyyeeee...");})
            .catch(err => {
                msg.channel.send("Something went wrong... Maybe I do not have the permissions to kick this user.");
                console.log(err);
            });
    }
};