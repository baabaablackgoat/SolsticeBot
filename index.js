//################### Vars #######################

const discord = require("discord.js");
let settings = require("./settings");
const commands = require("./commands");
const commandKeys = Object.keys(commands);
const parseCommands = require("./modules/parseCommands");
const bot = new discord.Client();
let player = {
    dispatcher: null,
    queue: [],
    channel: null,
    nowPlaying: {
        title: "",
        src: "",
        issuedChannel: "",
    },
    autoplaylist: require("./data/autoplaylist"),
};

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

//############## Audioplayer Events ##############

player.dispatcher.on("start",()=>{

});

player.dispatcher.on("end",(reason)=>{ //Current stream has terminated - either the file or the stream is over, or something else went wrong.
    console.log(`Audio dispatcher has ended: ${reason}`);
    player.nowPlaying.title = "";
    player.nowPlaying.src = "";
    player.nowPlaying.issuedChannel = "";
    if (player.queue.length > 0) {
        nextInQueue(player);
    } else if (settings.player.autoplaylist && player.autoplaylist.length > 0) {
        //If enabled and valid playlist is available, play a random song from the autoplaylist
    } else {
        //Disconnect from the voice channel.
    }
});

player.dispatcher.on("error",(err)=>{
    console.log(`Audio dispatcher has encountered an error: ${err}`);
});


//################## Bot Events ##################

bot.on("ready",()=>{
    console.log("Solstice is ready. Logged in as "+bot.user.username);
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