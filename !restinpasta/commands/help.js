const Discord = require("discord.js");
const eachObject = require("../methods/eachObject");

module.exports = function (bot, msg, args, options) {
    const commands = require("../data/commands"); //needs to be placed in fn to avoid timing issues
    const commandKeys = Object.keys(commands); 
    let reply = [];
    let useraccess = options.useraccess;

    const commandCheck = function(call) {
        for (let i = 0; i < commandKeys.length; i++) {
            if (commands[commandKeys[i]].aliases.indexOf(call) > -1) {
                return commands[commandKeys[i]];
            }
        }
        //If the function didn't return early / quit the for loop
        return false;
    };

    if (args[0]) {
        let command_id = commandCheck(args[0]);
        if (command_id) {
            let commandaccess = command_id.access;

            if (useraccess >= commandaccess) {
                let embed = new Discord.RichEmbed();

                embed.setAuthor("Solstice Help Dialogue | " + args[0], bot.user.avatarURL);
                embed.setColor([255, 125, 0]);
                embed.setTitle("TL;DR:");
                embed.setDescription(command_id.help.indepth);

                if (command_id.help.args) {
                    embed.addField("Arguments", command_id.help.args);
                } else {
                    embed.addField("Arguments", "This command takes no arguments.");
                }
                if (command_id.aliases) {
                    embed.addField("Aliases", command_id.aliases);
                } else {
                    embed.addField("Aliases", "This command has no aliases.");
                }
                embed.addField("Access", "Requires access level of " + commandaccess + " or higher.\n(You are Access Level " + useraccess + ".)");
                msg.channel.send("",{embed:embed});
            } else {
                msg.channel.send("You don't have access to the command `" + args[0] + "`.");
            }
        } else {
            msg.channel.send("`" + args[0] + "` is not a valid command.");
        }
    } else {
        eachObject(commands, (command,key) => {
            //console.log(useraccess, commands[key].access);
            if ((!command.hidden) && (useraccess >= command.access)) {
                reply.push(key, " ".repeat(15 - key.length), command.help.text, "\n");
            }
        });

        msg.channel.send("```" + reply.join("") + "```");
    }
};