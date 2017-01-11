"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const settings = require("./settings.js");
const files = require("./data/files");
const parseCommands = require("./methods/parseCommands");
let userlist = JSON.parse(fs.readFileSync('./data/userlist.json', 'utf8'));
let queue = [];
let playing = false;
let currentlyPlaying = ""; // global vars for the music bot
let user = [];
let votes = {}; // global vars for the voting system
let dispatcher, userVoice, VoiceConnection; //That's the voice channel the bot is talking in

const commands = require("./data/commands");

bot.on("message", msg => {
    if (msg.content.startsWith(settings.prefix) && !msg.author.bot) { //Invoker? Not a bot user?
        if (settings.useDiscordRoles && msg.member.roles.has(settings.botbanned_role_id)) { //Using Discord Roles (NYI), is the user banned?
            if (userlist.banned[msg.author.id] === undefined) {
                if (settings.access_role_id) {
                    msg.channel.sendMessage("<@&" + settings.access_role_id + ">, the user <@" + msg.author.id + "> still has the botbanned role, but does not have a ban entry in the bot logs. Please double-check your records, and use `" + settings.prefix + "botban (time)`.");
                } else {
                    msg.channel.sendMessage("Attention, Mods! The user <@" + msg.author.id + "> still has the botbanned role, but does not have a ban entry in the bot logs. Please double-check your records, and use `" + settings.prefix + "botban (time)`.");
                }
                return;
            } else if (userlist.banned[msg.author.id].expires === "never" || userlist.banned[msg.author.id].expires > new Date()) {
                msg.channel.sendMessage("<@" + msg.author.id + ">, you are botbanned for another " + bannedFor(userlist.banned[msg.author.id].expires));
                console.log(msg.author.username + " attempted to use a command but is banned");
                return;
            }
        } else if (!settings.useDiscordRoles && userlist.banned.hasOwnProperty(msg.author.id)) {
            if (userlist.banned[msg.author.id].expires === "never" || userlist.banned[msg.author.id].expires > new Date()) {
                msg.channel.sendMessage("<@" + msg.author.id + ">, you are botbanned for another " + bannedFor(userlist.banned[msg.author.id].expires));
                console.log(msg.author.username + " attempted to use a command but is banned");
                return;
            }
        }
        var raw = msg.content.substring(settings.prefix.length);
        let call = parseCommands(raw);
        if (commands.hasOwnProperty(call.name)) { //Is this command valid?
            let useraccess;
            if (!userlist.mods.hasOwnProperty(msg.author.id)) {useraccess = 0} else {useraccess = userlist.mods[msg.author.id].access} //set useraccess
            if (commands[call.name].access <= useraccess) { //Is useraccess equal or greater than commands.command.access?
                console.log(msg.author.username + " called command: " + call.name + " " + call.args.join(",")); //run command
                var fn = commands[call.name].function;
                if (typeof fn === 'function') { //Is the function that executes the command available?
                    let args = call.args;
                    let options = {
                        "access": commands[call.name].access,
                        "useraccess": useraccess,
                        "callname": call.name,
                        "settings": settings,
                    };
                    fn(bot,msg,args,options);
                } else { //Function not found
                    console.log("Fatal error - function not resolvable");
                }
            } else { //Useraccess was smaller than command access value
                console.log(msg.author.username+" called command "+call.name+" but doesn't have access: "+useraccess+"<"+commands[call.name].access);
                msg.channel.sendMessage("You do not have access to this command. | "+useraccess+"<"+commands[call.name].access);
                if (!commands[call.name].punishment === false) {
                    const applyBotBan = require("./methods/applyBotBan");
                    applyBotBan("<@"+msg.author.id+">",commands[call.name].punishment);
                    console.log("Automatically botbanned user.");
                }
            }
        } else { //User entered unknown command
            console.log(msg.author.username + " called an unknown command: " + call.name);
            msg.channel.sendMessage("Unknown command. `"+settings.prefix+"help`");
        }
    }
});

bot.on("ready", () => {
    console.log("Solstice is ready.");
    //The following block automatically adds the bot owner to the mods userlist, with an access value of 99. This should always grant an override.
    if (!settings.owner_id) {
        console.log("No owner ID set! Terminate the bot process (hold ctrl+c in your console) and add it.");
    } else {
        if (!userlist.mods.hasOwnProperty(settings.owner_id)) {
            userlist.mods[settings.owner_id] = {};
        }
        userlist.mods[settings.owner_id].access = 99;
        userlist.mods[settings.owner_id].id = Number(settings.owner_id);
        fs.writeFile('./data/userlist.json', JSON.stringify(userlist,"  ","  "));
    }
    const setGame = require("./methods/setGame");
    setGame(settings.default_game);
});

bot.login(settings.token);