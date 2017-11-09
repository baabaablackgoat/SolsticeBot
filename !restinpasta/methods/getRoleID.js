module.exports = function(msg,args) {
    let mentions = msg.mentions.roles.array();
    let response = [];
    if (mentions.length > 0) {
        for (let i = 0; i < mentions.length; i++) {
            response.push(mentions[i].id);
        }
    } else if (args.length > 0) {
        for (let i = 0; i < args.length; i++) {
            let temp = msg.guild.roles.find("name",args[i]);
            if (temp) {
                response.push(temp.id);
            }
        }
    } else {
        console.log("no valid role");
    }
    return response;
};