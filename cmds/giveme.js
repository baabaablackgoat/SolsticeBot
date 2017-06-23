const giveme_list = require("./../data/giveme");
const timeparse = require("./../modules/timeparse");
const giveme_keys = Object.keys(giveme_list);
const giveme_check = function(input) {
    for (let i=0; i<giveme_keys.length; i++){
        if (giveme_list[giveme_keys[i]].aliases.indexOf(input)>-1){
            return giveme_list[giveme_keys[i]];
        }
    }
    return false;
};

const give_role = function (msg,roleid) {
    msg.member.addRole(roleid)
        .then((member)=>{
            msg.channel.send(`I have given you ${member.guild.roles.get(roleid).name}.`);
        })
        .catch((err)=>{
            msg.channel.send(`Whoops! Something went wrong - you are clear to recieve the role, but I couldn't assign it!`);
            console.log(`command giveme encountered an exception whilst assigning a role:\n${err}`);
        });
};

const strip_role = function (msg,roleid) { 
    msg.member.removeRole(roleid)
        .then((member)=>{
            if (member.user.id === "155900016354000896") { // :^)
                msg.channel.send(`ur stripped, cody`);
            }
            msg.channel.send(`I have taken ${member.guild.roles.get(roleid).name} away from you.`);
        })
        .catch((err)=>{
            msg.channel.send(`Whoops! Something went wrong - you are clear to take the role from yourself, but I couldn't remove it!`);
            console.log(`command giveme encountered an exception whilst removing a role:\n${err}`);
        });
};

module.exports = function(bot,msg,args,options){
    if (!args[0]) {
        msg.channel.send(`You didn't tell me which role you desire!`);
        return;
    }
    if (args[0] === "list") {
        let response = "";
        for (let i=0; i<giveme_keys.length; i++) {
            response += `[${msg.guild.roles.get(giveme_list[giveme_keys[i]].id).name}]\n`;
        }
        msg.channel.send(`List of giveme-available roles:\n${response}`);
        return;
    }

    let data = giveme_check(args[0].toLowerCase());
    if (data){
        //Does the role require other role(s)? (requires: role)
        if (data.requires.roles) {
            let user_role_amt = 0;
            for (let i=0;i<data.requires.roles.length;i++){
                if (msg.member.roles.has(data.requires.roles[i])){
                    user_role_amt++;
                }
            }
            if(data.requires.require_all_roles && user_role_amt < data.requires.roles.length){
                msg.channel.send(`You are missing one of the multiple necessary roles to use this giveme.`);
                return;
            } else if (user_role_amt < 1){
                msg.channel.send(`You have none of the neccessary roles to use this giveme.`);
                return;
            }
        }
        //Does the role require to be member for a certain time? (requires: time)
        if (data.requires.time){
            let time = timeparse(data.requires.time);
            let usertime = new Date().getTime()-msg.member.joinedTimestamp;
            if (time > usertime) {
                msg.channel.send(`You cannot use this giveme yet. You have to be a member of this server for ${data.requires.time}.`);
                return;
            }
        }

        //Does the member have a conflicting role? (bannedroles)
        if (data.bannedroles) {
            for (let i=0;i<data.bannedroles.length;i++){
                if (msg.member.roles.has(data.bannedroles[i])) {
                    msg.channel.send(`You cannot use this giveme because you have the role ${msg.member.roles.get(data.bannedroles[i]).name}.`);
                    return;
                }
            }
        }

        if (!msg.member.roles.has(data.id)){
            if (data.mode === "toggle" || data.mode === "give_only") {
                give_role(msg,data.id);
            } else {
                msg.channel.send(`You cannot give this role to yourself - it was set to only be removable!`);
            }
        } else {
            if (data.mode === "toggle" || data.mode === "remove_only") {
                strip_role(msg,data.id);
            } else {
                msg.channel.send(`You cannot remove this role from yourself - it was set to only be obtainable!`);
            }    
        }
    } else {
        msg.channel.send(`I couldn't find a giveme with your given alias ${args[0]}.`);
    }
};