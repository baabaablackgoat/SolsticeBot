module.exports = function(bot,msg,calledCommand){
    if (calledCommand.access.permissions) {
        if (!msg.member.hasPermission(calledCommand.access.permissions,false,false)) {
            return {reason: "permission", specific: calledCommand.access.permissions};
        }
    }
    if (calledCommand.access.roles) {
        let user_role_amt = 0;
        for (let i=0;i<calledCommand.access.roles.ids.length;i++){
            if (msg.member.roles.has(calledCommand.access.roles.ids[i])){
                user_role_amt++;
            }
        }
        if(calledCommand.access.roles.require_all && user_role_amt < calledCommand.access.roles.ids.length){
            return {reason: "role_all", specific: calledCommand.access.roles};
        } else if (user_role_amt < 1){
            return {reason: "role_one", specific: calledCommand.access.roles};
        }
    }
    if (calledCommand.access.user_lists) {
        let test_against = [];
        (typeof calledCommand.access.user_lists === "string") ? test_against.push(calledCommand.access.user_lists) : test_against = calledCommand.access.user_lists;
        for (let i=0;i<test_against.length;i++){
            if (bot._userlists.hasOwnProperty(test_against[i]) && !bot._userlists[test_against[i]].includes(msg.author.id)) {
                return {reason: "userlist", specific: test_against[i]};
            }
        }
    }
    return false;
};