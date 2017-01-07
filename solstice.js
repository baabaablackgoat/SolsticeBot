"use strict";

const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const bot = new Discord.Client();
const settings = require("./settings.js");
let dispatcher, userVoice; //That's the voice channel the bot is talking in

//Debug
const debug = function (msg) {
    var temp = msg.channel.sendMessage("./cg_dream4_3.png");
};
//Ping, Pong!
const ping = function (msg) {
    msg.channel.sendMessage("Pong!");
};
//Stop the current node.js process with an exit message - if called by the bot owner, only. 
const terminate = function (msg) {
    if (msg.author.id === settings.owner_id) {
        msg.channel.sendMessage("Niklas, no! I will not smash the sun! *shattering sound*");
        setTimeout(process.exit,1000);
    } else {
        msg.channel.sendMessage(msg.author.username+ ", no! I will not smash the sun!");
    }
};
//Play a predefined file (see files object)
const play = function (msg) {
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (call[1]) { // Was an argument passed?
        if (call[1].startsWith("http")) { // Was a link passed?
            msg.channel.sendMessage("Checking link...");
            let ytInfo = ytdl.getInfo(call[1], {filter: "audioonly"},function(err,info){
                if (!err) {
                    var stream = ytdl(call[1], { filter: "audioonly" });
                    sound_play(msg,"stream",stream);
                } else {
                    msg.channel.sendMessage("Invalid link.");
                    console.log(err);
                }
            });
        } else {
            if (call[1] === "random" || call[1] === "rdm"){ //Is the passed argument "rdm" or "random" ?
                const temp = Object.keys(files);
                call[1] = temp[Math.floor(Math.random()* (temp.length))];
                msg.channel.sendMessage(":heart::spades::heart::spades: Playing: "+call[1]);
            }
            var file = files[call[1]];
            if (call[1].toLowerCase() in files) { // Does the passed key exist in the files object?
               sound_play(msg,"file",file);
            } else { // File does not exist/was not defined
                msg.channel.sendMessage("File/Meme not found.");
            }
        }   
    } else { // No argument passed
        msg.channel.sendMessage("**REEEEEEEE**, it's `" + settings.prefix + "play [filename]`");
    }
};
//Disconnect the bot from the voice channel.
const disconnect = function (msg) {
    if (dispatcher) {
        dispatcher.end("Halted by user");
        userVoice.leave();
        msg.channel.send("Left voice channel.");
        dispatcher = null;
    } else {
        msg.channel.send("Not in a voice channel!");
    }
}
//Change volume of the bot
const volume = function (msg) {
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" "); 
    if (!call[1] && dispatcher) {
        msg.channel.sendMessage("The current volume is "+dispatcher.volume);
    } else if (!dispatcher) {
        msg.channel.sendMessage("Sound Dispatcher is offline.");
    } else {
        if (call[1]>=0 && call[1]<=2) {
            dispatcher.setVolume(call[1]);
            msg.channel.sendMessage("Volume has been set to "+call[1]);
        } else {
            msg.channel.sendMessage("Error! Volume can only be set between 0 and 2. Your value "+call[1]+" is out of bounds!");
        }
    }
}
//Used to play the stream/file
const sound_play = function (msg,type,src) {
    if (dispatcher) {dispatcher.end("Halted due to two audio files playing at the same time");}
    const userVoiceID = msg.member.voiceChannelID;
    userVoice = msg.guild.channels.get(userVoiceID);
    userVoice.join().then(connection => {
        if (type === "file") {
            dispatcher = connection.playFile('./sounds/'+src);
        } else if (type === "stream") {
            dispatcher = connection.playStream(src);
        } else {
            console.log("What the fuck, man?");
        }
        dispatcher.on('speaking', (event, listener) => {
            if (!event) {
                userVoice.leave();
                dispatcher = null;
            }
        });
    });
}
//Return information about the user
const userinfo = function (msg) {
    let reply = new Discord.RichEmbed();
    //reply.color = 0;
    reply.addField(msg.author.username+"#"+msg.author.discriminator);
    console.log(reply);
    msg.channel.sendMessage("reply"); 
};
//For the loods
const fuck = function (msg) {
    msg.channel.sendMessage("Wow, no, you l00d.");
};
//lots of kappa
const memes = function (msg){
    const memepages = [
        "https://www.reddit.com/r/kreiswichs/",
        "https://www.reddit.com/r/nottheonion/",
        "https://www.reddit.com/r/showerthoughts/",
        "https://www.reddit.com/r/GlobalOffensive/",
        "https://www.reddit.com/r/Overwatch/",
        "https://www.reddit.com/r/iamverysmart/",
        "https://www.youtube.com/watch?v=yXXyfeWJz1M"
    ];
    msg.channel.sendMessage(memepages[Math.floor(Math.random()*memepages.length)] +" ( ͡° ͜ʖ ͡°)");
}
const commands = {
    debug: debug,
    ping: ping,
    memes: memes,
    play: play,
    music: play,
    disconnect: disconnect,
    dc: disconnect,
    volume: volume,
    vol: volume,
    userinfo: userinfo,
    fuck: fuck,
    break: terminate,
    die: terminate,
    terminate: terminate
};

const files = {
    cena: "cena.mp3",
    holzbrett: "holzbrett.mp3",
    lazytown: "lazyboom.mp3",
    drawingdicks: "dicks.mp3",
    sail: "sail.mp3",
    saail: "saail.mp3",
    slowclap: "slowclap.mp3",
    wochenende: "wochenende.mp3",
    neinneinnein: "neinneinnein.mp3",
    bausparvertrag: "bausparvertrag.mp3",
    sailremix: "sailremix.mp3",
    spada_youandi: "spada_youandi.mp3"
};

bot.on("message", msg => {
    if (msg.content.startsWith(settings.prefix) && !msg.author.bot) {
        var call = msg.content.substring(settings.prefix.length);
        call = call.split(" ");
        if (call[0] in commands) {
            console.log(msg.author.username + " called command: " + call);
            var fn = commands[call[0]];
            if (typeof fn === 'function') {
                fn(msg);
            } else {
                console.log("couldn't find function");
            }
        } else {
            console.log(msg.author.username + " called an unknown command: " + call);
            msg.channel.sendMessage("Unknown command.");
        }
    }
});

bot.on("ready", () => {
    console.log("Solstice is ready.");
});

bot.login(settings.token);