const commands = require("./../data/commands.js");
const Discord = require("discord.js");

module.exports = function (bot, msg, args, options) {
    let reply = [];
    let useraccess = options.useraccess;
    if (args[0]) {
        if (commands.hasOwnProperty(args[0])) {
            let commandaccess = commands[args[0]].access;
            if (useraccess >= commandaccess) {
                let embed = new Discord.RichEmbed();
                embed.setAuthor("Solstice Help Dialogue | " + args[0], bot.user.avatarURL);
                embed.setColor([255, 125, 0]);
                embed.setTitle("TL;DR:");
                embed.setDescription(commands[args[0]].help_indepth);
                if (commands[args[0]].help_args) {
                    embed.addField("Arguments", commands[args[0]].help_args);
                } else {
                    embed.addField("Arguments", "This command takes no arguments.");
                }
                if (commands[args[0]].help_aliases) {
                    embed.addField("Aliases", commands[args[0]].help_aliases);
                } else {
                    embed.addField("Aliases", "This command has no aliases.");
                }
                embed.addField("Access", "Requires access level of " + commandaccess + " or higher.\n(You are Access Level " + useraccess + ".)");
                msg.channel.sendEmbed(embed);
            } else {
                msg.channel.sendMessage("You don't have access to the command `" + args[0] + "`.");
            }
        } else {
            msg.channel.sendMessage("`" + args[0] + "` is not a valid command.");
        }
    } else {
        for (let key in commands) {
            if (!commands[key].hidden && useraccess >= commands[key].access) {
                reply.push(key, " ".repeat(15 - key.length), commands[key].help_text, "\n");
            }
        }
        msg.channel.sendMessage("```" + reply.join("") + "```");
    }
};