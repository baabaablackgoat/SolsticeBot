const getMembersfromMention = require("./../methods/getMemberfromMention");
module.exports = function(bot,msg,args,options) {
    let members = getMembersfromMention(msg);
    for (let i = 0; i < members.id_list.length; i++) {
        members.values[members.id_list[i]].ban()
            .then(() => {msg.channel.sendMessage("Goodbye forever.");})
            .catch(err => {
                msg.channel.sendMessage("Something went wrong... Maybe I do not have the permissions to ban this user.");
                console.log(err);
            });
    }
};