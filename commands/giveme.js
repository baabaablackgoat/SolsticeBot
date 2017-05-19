const givemes = require("./../data/givemes");
const hasRole = require("./../methods/hasRole");
const givemeKeys = Object.keys(givemes);
const getInfo = function (input) {
    for (let i=0;i<givemeKeys.length;i++) {
        if (givemes[givemeKeys[i]].aliases.indexOf(input.toLowerCase()) > -1) {
            return givemes[givemeKeys[i]];
        }
    }
    return false;
};
module.exports = function (bot,msg,args,options) {
    let data = getInfo(args[0]);
    if (data) {
        if (data.requires.role && !hasRole(msg.member,data.requires.role,"one")) {
            msg.channel.send("This giveme requires you to have the "+msg.guild.roles[data.requires.role].name+" role.");
            return;
        }
        if (data.requires.time && new Date().getTime - msg.member.joinedTimestamp < data.requires.time) {
            msg.channel.send("This giveme requires you to be a member of this server for (coming soon)");
            return;
        }
        if (data.options.revokable && hasRole(msg.member,[data.role],"all")) {
            msg.channel.send("I have taken this role from you.");
            //Do something to revoke the role
            return;
        }
        msg.channel.send("I have assigned you this role.");
        console.log(msg.guild.roles[data.role]);
        msg.member.addRole(msg.guild.roles[data.role]);
    } else {
        msg.channel.send("There is no giveme with the name `"+args[0]+"`.");
    }
};