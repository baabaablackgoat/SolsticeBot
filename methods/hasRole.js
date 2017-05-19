module.exports = function(member,roleids,mode) {
    if (mode === "all") { //User needs all roles
        let hits = 0;
        for (let i=0; i<roleids.length;i++) {
            if (member.roles.has(roleids[i])) {
                hits++;
            }
        }
        if (hits < roleids.length) {
            return false;
        } else if (hits = roleids.length) {
            return true;
        }
    } else if (mode === "one") { //User needs one of the roles
        for (let i=0;i<roleids.length;i++) {
            if (member.roles.has(roleids[i])) {
                return true;
            }
        }
        return false;
    }
};