const getMembersfromMention = require("./../methods/getMemberfromMention");
module.exports = function(bot,msg,args,options) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.channel.send("You don't have the Ban Members permission.");
        return;
    }
    let members = getMembersfromMention(msg);
    for (let i = 0; i < members.id_list.length; i++) {
        if (members.values[members.id_list[i]].highestRole.position >= msg.member.highestRole.position){
            msg.channel.send("You cannot ban this user! He is on the same or a higher role!");
            return;
        }
        members.values[members.id_list[i]].ban()
            .then(() => {msg.channel.send("**"+members.values[members.id_list[i]].user.username+"**, ID "+members.values[members.id_list[i]].id+", has been banned. Goodbye forever. <https://www.youtube.com/watch?v=FXPKJUE86d0>");})
            .catch(err => {
                msg.channel.send("Something went wrong... Maybe I do not have the permissions to ban this user.");
                console.log(err);
            });
    }
    if (members.id_list.length >= 1) {
        return; //Job's done, you banned via mentions. Do not ban via ID.
    }
    else if (members.id_list.length < 1) { //If the mentions couldn't be resolved to members, ban with IDs.
    let banned_ids = [];
        for (let j=0;j<args.length;j++) {
            if (!isNaN(Number(args[j]))){
                banned_ids.push(args[j]); //Assume this is an ID.
            }
        }
        if (banned_ids.length < 1) {
            msg.channel.send("You didn't provide a valid mention or ID.");
            return;
        } else {
            for (let j=0; j<banned_ids.length; j++) {
                if (msg.guild.members[banned_ids[j]]) { //Check if the user is present on the server before doing anything.
                    if (msg.guild.members[banned_ids[j]].highestRole.position >= msg.member.highestRole.position){ //If the member is present, compare the roles.
                        msg.channel.send("You cannot ban this user! He is on the same or a higher role!");
                        return;
                    }
                }
                msg.guild.ban(banned_ids[j])
                    .then(()=>{msg.channel.send("The user with the ID "+banned_ids[j]+" was banned. Goodbye forever. <https://www.youtube.com/watch?v=FXPKJUE86d0>")})
                    .catch(err=>{
                        msg.channel.send("Something went wrong... Maybe I don't have the permission to ban this user.\n ```\n"+err+"```");
                        console.log(err);
                    });
            }
        }
    }
};