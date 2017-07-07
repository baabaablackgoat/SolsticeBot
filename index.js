//################### Vars #######################

const discord = require("discord.js");
const fs = require("fs");
let settings = require("./settings");
const commands = require("./commands");
const commandKeys = Object.keys(commands);
const parseCommands = require("./modules/parseCommands");
const nextInQueue = require("./modules/nextinqueue");
const checkAccess = require("./modules/checkAccess");
const joinVC = require("./modules/joinVC");
const checkReminders = require("./modules/checkreminders");
const bot = new discord.Client();
bot._player = {
    connection: null,
    queue: [],
    nowPlaying: false,
};
bot._userlists = {};
bot._votes = {};
bot._reminders = {};
bot._interval = {reminders: setInterval(function(){checkReminders(bot);},1000)};

//############### Loading files ##################

if (settings.player.autoplaylist) {
    fs.readFile("./data/autoplaylist.txt",'utf8',(err,data)=>{
        if (!err) {
            const result = data.includes("\r\n") ? data.split("\r\n") : data.split("\n");
            bot._player.autoplaylist = result;
        } else {
            console.log(`Failed to load autoplaylist: ${err}`);
            bot._player.autoplaylist = false;
        }
    });  
}

fs.readFile("./data/reminders.json","utf8",(err,data)=>{
    if (!err) {
        try {
            bot._reminders = JSON.parse(data);
        } catch (err) {
            console.log(`Failed to parse JSON: ${err}`);
        }
    } else {
        console.log(`Reminders couldn't be restored: ${err}`);
    }
});


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

const getUserLists = function(){
    fs.readdir("./data/userlists",(err,filenames)=>{
        if (!err) {
            for (let i=0;i<filenames.length;i++){
                fs.readFile(`./data/userlists/${filenames[i]}`,"utf8",(err,data)=>{
                    if (!err) {
                        bot._userlists[filenames[i].substr(0,filenames[i].length-4)] = data.includes("\r\n") ? data.split("\r\n") : data.split("\n");
                    } else {
                        throw `Failed to read userlist ./data/userlists/${filenames[i]}: ${err}`;
                    }
                });
            }
        } else {
            throw `Failed to load Userlists: ${err}`; 
        }
    });
};

//################## Bot Events ##################

bot.on("ready",()=>{
    console.log("Solstice is ready. Logged in as "+bot.user.username);
    getUserLists();
    if (settings.player.defaultChannel) {
        if (settings.player.autoplaylist) {
            nextInQueue(bot);
        } else {
            joinVC(settings.player.defaultChannel)
                .then(()=>{console.log("connected");})
                .catch((err)=>{console.log(`Couldn't connect to default VC: ${err}`);});
        }
    }
});
bot.on("message", (msg)=>{
    if (msg.author.bot) { //Bot messages are ignored.
        return;
    }
    if (msg.channel.type === "dm") { //DM Messages are (temporairly) ignored for safety reasons because it *could* crash the bot.
        return;
    }
    let usedPrefix = prefixCheck(msg); 
    if (usedPrefix){ //Did the message start with one of the defined prefixes?
        let raw = msg.content.substring(usedPrefix.length);
        let call = parseCommands(raw);
        let calledCommand = commandCheck(call);
        if (calledCommand) {
            let access = checkAccess(bot,msg,calledCommand);
            if (access) {
                if (access.reason === "userlist") {
                    msg.channel.send(`Only ${access.specific} can use this command.`);  
                } else if (access.reason === "role_all") {
                    msg.channel.send(`You are missing one of the multiple necessary roles to use this command.`);
                } else if (access.reason === "role_one") {
                    msg.channel.send(`You have none of the neccessary roles to use this command.`);
                } else if (access.reason === "permission") {
                    msg.channel.send(`You don't have the required permissions in this guild to run this command. You need to have \`${access.specific.join(", ")}\`.`);
                } else {
                    console.log(`Something went wrong while checking access for ${msg.author.name} using ${calledCommand} - checkAccess returned invalid values ${access}`);
                }
                return;
            }
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