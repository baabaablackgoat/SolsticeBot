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
let userlists = {};
bot._userlists = userlists;
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

const getUserLists = function(){
    fs.readdir("./data/userlists",(err,filenames)=>{
        if (!err) {
            for (let i=0;i<filenames.length;i++){
                fs.readFile(`./data/userlists/${filenames[i]}`,"utf8",(err,data)=>{
                    if (!err) {
                        userlists[filenames[i].substr(0,filenames[i].length-4)] = data.includes("\r\n") ? data.split("\r\n") : data.split("\n");
                    } else {
                        throw `Failed to read userlist ./data/userlists/${filenames[i]}: ${err}`;
                    }
                });
            }
        } else {
            throw `Failed to load Userlists: ${err}`; 
        }
    });
}

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
    let usedPrefix = prefixCheck(msg); 
    if (usedPrefix){ //Did the message start with one of the defined prefixes?
        let raw = msg.content.substring(usedPrefix.length);
        let call = parseCommands(raw);
        let calledCommand = commandCheck(call);
        if (calledCommand) {
            if (calledCommand.access.permissions) {
                console.log("needs permissions");
                if (!msg.member.hasPermission(calledCommand.access.permissions,false,false)) {
                    console.log("doesn't have perms");
                    msg.channel.send(`You don't have the required permissions in this guild to run this command. You need to have \`${calledCommand.access.permissions.join(", ")}\`.`);
                    return;
                }
            }
            if (calledCommand.access.roles) { //Maybe put this into an external module at some point - this is also used in giveme!
                let user_role_amt = 0;
                for (let i=0;i<calledCommand.access.roles.ids.length;i++){
                    if (msg.member.roles.has(calledCommand.access.roles.ids[i])){
                        user_role_amt++;
                    }
                }
                if(calledCommand.access.roles.require_all && user_role_amt < calledCommand.access.roles.ids.length){
                    msg.channel.send(`You are missing one of the multiple necessary roles to use this command.`);
                    return;
                } else if (user_role_amt < 1){
                    msg.channel.send(`You have none of the neccessary roles to use this command.`);
                    return;
                }
            }
            if (calledCommand.access.user_lists) {
                let test_against = [];
                (typeof calledCommand.access.user_lists === "string") ? test_against.push(calledCommand.access.user_lists) : test_against = calledCommand.access.user_lists;
                console.log(test_against);
                for (let i=0;i<test_against.length;i++){
                    userlists.hasOwnProperty(test_against[i])
                    if (userlists.hasOwnProperty(test_against[i]) && !userlists[test_against[i]].includes(msg.author.id)) {
                        msg.channel.send(`Only ${test_against[i]} can use this command.`);
                        return;
                    }
                }
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