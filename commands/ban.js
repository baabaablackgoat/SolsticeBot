const getMembersfromMention = require("./../methods/getMemberfromMention");
module.exports = function(bot,msg,args,options) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.channel.sendMessage("You don't have the Ban Members permission.");
        return;
    }
    let members = getMembersfromMention(msg);
    /*
    if (members.id_list.length < 1) {
        //If no members were found (or the user isn't on the server...)
        for (let j=0;j<args.length;j++) {
            console.log(args[j]);
            members.id_list.push(args[j]);
            members.values[args[j]] = bot.users.get(args[j]);
        }
        //Check if any new members were added from that.
        if (members.id_list.length < 1) {
            msg.channel.sendMessage("You didn't provide a valid mention or ID.");
            return;
        }
    }*/
    for (let i = 0; i < members.id_list.length; i++) {
        if (members.values[members.id_list[i]].highestRole.position >= msg.member.highestRole.position){
            msg.channel.sendMessage("You cannot ban this user! He is on the same or a higher role!");
            return;
        }
        members.values[members.id_list[i]].ban()
            .then(() => {msg.channel.sendMessage("Goodbye forever. https://www.youtube.com/watch?v=FXPKJUE86d0");})
            .catch(err => {
                msg.channel.sendMessage("Something went wrong... Maybe I do not have the permissions to ban this user.");
                console.log(err);
            });
    }
};