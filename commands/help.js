module.exports = function (msg) {
    let reply = [];
    let useraccess;
    if (!userlist.mods.hasOwnProperty(msg.author.id)){useraccess=0;}else{useraccess=userlist.mods[msg.author.id].access;}
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (call[1]) {
        if (commands.hasOwnProperty(call[1])){
            if (useraccess >= commands[call[1]].access) {
                let embed = new Discord.RichEmbed();
                embed.setAuthor("Solstice Help Dialogue | "+call[1], bot.user.avatarURL);
                embed.setColor([255,125,0]);
                embed.setTitle("TL;DR:");
                embed.setDescription(commands[call[1]].help_indepth);
                if (commands[call[1]].help_args) {
                    embed.addField("Arguments",commands[call[1]].help_args);
                } else {
                    embed.addField("Arguments","This command takes no arguments.");
                }
                if (commands[call[1]].help_aliases) {
                    embed.addField("Aliases",commands[call[1]].help_aliases);
                } else {
                    embed.addField("Aliases","This command has no aliases.");
                }
                embed.addField("Access","Requires access level of "+commands[call[1]].access+" or higher.\n(You are Access Level "+useraccess+".)");
                msg.channel.sendEmbed(embed);
            } else {
                msg.channel.sendMessage("You don't have access to the command `"+call[1]+"`.");
            }
        } else {
            msg.channel.sendMessage("`"+call[1]+"` is not a valid command.");
        }
    } else {
        for (var key in commands){
            if (!commands[key].hidden && useraccess>=commands[key].access){
                reply.push(key," ".repeat(15-key.length),commands[key].help_text,"\n");
            }
        }
        msg.channel.sendMessage("```"+reply.join("")+"```");
    }
};