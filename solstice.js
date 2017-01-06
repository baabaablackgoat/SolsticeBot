"use strict";

const Discord = require("discord.js");
const bot = new Discord.Client();
const settings = require("./settings.js");
let dispatcher, userVoice; //That's the voice channel the bot is talking in

//Debug
const debug = function (msg) {
    const userVoiceID = msg.member.voiceChannelID;
    const userVoice = msg.guild.channels.get(userVoiceID);

    msg.channel.sendMessage("```Debug executed, check console```");
    msg.channel.sendMessage("user is currently in voice channel " + userVoice);
    //console.log(userVoice);
};
//Ping, Pong!
const ping = function (msg) {
    msg.channel.sendMessage("Pong!");
};
//Stop the current node.js process with an exit message - if called by the bot owner, only. 
const terminate = function (msg) {
    if (msg.author.id === settings.owner_id) {
        msg.channel.sendMessage("...I understand.");
        setTimeout(process.exit,1000);
    } else {
        msg.channel.sendMessage("Ha, no, fuck you!");
    }
};
//Play a predefined file (see files object)
const play = function (msg) {
    const files = {
        cena: "cena.mp3",
        holzbrett: "holzbrett.mp3"
    };
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (call[1]) {
        var file = files[call[1]];
        if (call[1].toLowerCase() in files) {
            const userVoiceID = msg.member.voiceChannelID;
            userVoice = msg.guild.channels.get(userVoiceID);
            userVoice.join().then(connection => {
                dispatcher = connection.playFile('./sounds/'+file);
                console.log('./sounds/'+file);
                dispatcher.on('speaking', (event, listener) => {
                    if (!event) {
                        userVoice.leave();
                        dispatcher = null;
                    }
                });
            });
        } else {
            msg.channel.sendMessage("File/Meme not found.");
        }

    } else {
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
//Return information about the user
const userinfo = function (msg) {
    /*
    var reply = new Discord.RichEmbed();
    reply.color = 0;
    reply.addField(msg.author.username+"#"+msg.author.discriminator);
    msg.channel.sendMessage(reply);
    */
};
//For the loods
const fuck = function (msg) {
    msg.channel.sendMessage("Wow, no, you l00d.");
};

const commands = {
    debug: debug,
    ping: ping,
    play: play,
    disconnect: disconnect,
    dc: disconnect,
    userinfo: userinfo,
    fuck: fuck,
    die: terminate,
    terminate: terminate
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