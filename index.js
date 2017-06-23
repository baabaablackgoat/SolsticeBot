//################### Vars #######################

const discord = require("discord.js");
const fs = require("fs");
let settings = require("./settings");
const commands = require("./commands");
const commandKeys = Object.keys(commands);
const parseCommands = require("./modules/parseCommands");
const nextInQueue = require("./modules/nextinqueue");
const joinVC = require("./modules/joinVC");
const bot = new discord.Client();
let player = {
    connection: null,
    queue: [],
    nowPlaying: false,
};

bot._player = player;

if (settings.player.autoplaylist) {
    fs.readFile("./data/autoplaylist.txt",'utf8',(err,data)=>{
        if (!err) {
            const result = data.includes("\r\n") ? data.split("\r\n") : data.split("\n");
            player.autoplaylist = result;
        } else {
            console.log(`Failed to load autoplaylist: ${err}`);
            player.autoplaylist = false;
        }
    });  
}

//################## Functions ###################

const prefixCheck = function(msg){ //Function returns the used prefix. If no prefix was found, returns false.
    for (let i=0;i<settings.prefixes.length;i++) {
        if (msg.content.startsWith(settings.prefixes[i])) {
            return settings.prefixes[i];
        }
    }
    return false;
};

const commandCheck = function(call){
    for (let i=0; i<commandKeys.length; i++) {
        if (commands[commandKeys[i]].aliases.indexOf(call.name.toLowerCase()) > -1) {
            return commands[commandKeys[i]];
        }
    }
    return false;
};

//################## Bot Events ##################

bot.on("ready",()=>{
    console.log("Solstice is ready. Logged in as "+bot.user.username);
    if (settings.player.defaultChannel) {
        if (settings.player.autoplaylist) {
            nextInQueue(bot);
        } else {
            joinVC(settings.player.defaultChannel);
        }
    }
});
bot.on("message", (msg)=>{
    if (msg.author.bot) { //Bot messages are ignored.
        return;
    }
    let usedPrefix = prefixCheck(msg); 
    if (usedPrefix){ //Did the message start with one of the defined prefixes?
        let raw = msg.content.substring(usedPrefix.length);
        let call = parseCommands(raw);
        let calledCommand = commandCheck(call);
        if (calledCommand) {

            //Access Checks are put in place here.

            let fn = calledCommand.function;
            if (typeof fn === 'function') {
                let args = call.args;
                let options = {
                    "callname": call.name,
                    "settings": settings,
                };
                fn(bot, msg, args, options);
            } else {
                //Not entirely sure if this works, hee hee
                throw new Error("Fatal | Command was detected, but there is no associated function in commands.js.");
            }
        }
    }
});

bot.login(settings.token);