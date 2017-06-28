const discord = require("discord.js");
module.exports = function(bot,msg,args,options){
    const checkAccess = require("./../modules/checkAccess");
    const commands = require("./../commands.js");
    const commandKeys = Object.keys(commands);
    if (args.length < 1 || args[0].toLowerCase() === "hidden") {
        let response = [];
        if (!args[0]) {args[0]="none";}
        for (let i=0;i<commandKeys.length;i++){
            if (args[0].toLowerCase() === "hidden" || !commands[commandKeys[i]].hidden) {
                let access = checkAccess(bot,msg,commands[commandKeys[i]]); //Warning - access is _false_ when the user has access to the command!
                if (!access){
                    response.push("`"+commands[commandKeys[i]].aliases[0]+" ".repeat(14-commands[commandKeys[i]].aliases[0].length)+"|`"+commands[commandKeys[i]].help.short);
                }
            }
        }
        msg.channel.send(response.join("\n"));
    } else {
        for (let i=0;i<commandKeys.length;i++){
            if (commands[commandKeys[i]].aliases.includes(args[0].toLowerCase())) {
                let access = checkAccess(bot,msg,commands[commandKeys[i]]);
                if (access) {
                    msg.channel.send(`You cannot view the help for ${args[0].toLowerCase()} because you don't have access to this command. Reason: \`${access.reason}\``);
                    return;
                }
                let richEmbed = new discord.RichEmbed({
                    author: {
                        name: `Solstice Help | ${args[0].toLowerCase()}`,
                        icon: bot.user.avatarURL,
                    },
                    description: commands[commandKeys[i]].help.long,
                });
                let help_args;
                (commands[commandKeys[i]].help.args) ? help_args=commands[commandKeys[i]].help.args : help_args="This command takes no arguments.";
                richEmbed.addField("Arguments: ",help_args);
                richEmbed.addField("Aliases:",commands[commandKeys[i]].aliases.join(", "));
                richEmbed.setColor([255,125,0]);
                msg.channel.send({embed: richEmbed});
                return;
            }
        }
        msg.channel.send("I couldn't find that command...");
    }
};