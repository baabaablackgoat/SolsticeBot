"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const ytdl = require("ytdl-core");
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

//Global functions
//Joins the voicechannel of the message author
//Voice connection is asynchronous, takes up to 1000ms
function joinChannel(msg) {
    if (typeof VoiceConnection === 'undefined' || !VoiceConnection) {
        console.log("connecting to channel")
        const userVoiceID = msg.member.voiceChannelID;
        userVoice = msg.guild.channels.get(userVoiceID);
        refreshUser();
        userVoice.join().then(connection => {
            VoiceConnection = connection;
        });
    }
}
//a list of users in the voicechannel
function refreshUser() {
    user = [];
    userVoice.members.array().forEach(function (GuildMember) {
        if (GuildMember.user && !GuildMember.user.bot) {
            user.push(GuildMember.user);
        }
    });
}
//voting function: action acts as id, each vote has a array of client-ids of client that accepted the vote
//if more than 50% of the current clients in the voice channel voted(yes), the function returns true
function vote(msg, voteAction) {
    if (!votes[voteAction]) {
        votes[voteAction] = [msg.author.id];
    } else {
        votes[voteAction].push(msg.author.id);
    }

    if (evaluteVote(msg, voteAction)) {
        votes[voteAction] = [];
        return true;
    } else {
        return false;
    }
}
//checks if vote is now passed
function evaluteVote(msg, voteAction) {
    refreshUser();
    var all = user.length;
    var voted = 0;
    user.forEach(function (currentUser) {
        if (votes[voteAction].indexOf(currentUser.id) > -1) {
            voted += 1;
        }
    });
    msg.channel.sendMessage(voteAction + ": " + voted + " / " + all);
    return ((voted / all) >= 0.5);
}
//Checks the current queue. If no song is playing,  the queue jumpstarts
function checkQueue(msg) {
    if (typeof msg.member.voiceChannelID === "undefined") {
        msg.channel.sendMessage("You're not in a voicechannel! Couldn't join a voice channel.");
    } else {
        if (!playing && queue.length > 0) {
            joinChannel(msg);
            var item = queue.shift();
            setTimeout(function () {
                playFromQueue(msg, item);
            }, 500);
        } else if (!playing && dispatcher) {
            currentlyPlaying = "";
            disconnect(msg);
        }
    }
}
//Adds a song to the queue
function addtoQueue(msg, item) {
    queue.push(item);
    msg.channel.sendMessage(item.name + " was added to queue! Position: " + parseInt(queue.length));
}
//Plays the topmost song in the queue
function playFromQueue(msg, item) {
    if (typeof VoiceConnection !== 'undefined' && VoiceConnection) {
        votes["Skip current Song"] = []; // reset vote skip
        msg.channel.sendMessage("Now Playing: " + item.name);
        currentlyPlaying = item.name;
        setGame(item.name);

        if (item.stream) {
            var readable = ytdl(item.value, {
                'filter': 'audioonly'
            });
            dispatcher = VoiceConnection.playStream(readable);
            dispatcher.passes = 3;
        } else {
            dispatcher = VoiceConnection.playFile(item.value);
            dispatcher.passes = 3;
        }

        dispatcher.on('end', function () {
            playing = false;
            checkQueue(msg);
        });

        /**
        dispatcher.on('error',function(err){
        	console.log("dispatch error: " + err);
        	playing = false;	
        	checkQueue(msg);
        });	
        **/

        playing = true;
    } else {
        setTimeout(function () {
            playFromQueue(msg, item);
            console.log("retry");
        }, 100);
    }
};
//Modifies the bot's game
function setGame(game) {
    if (typeof game === "string") {
        bot.user.setGame(game);
        console.log("Changed Game presence to " + game);
    }
}
//Modifies the bot's status (takes online,idle,dnd,invisible)
function setStatus(status) {
    if (status === "online" || status === "idle" || status === "dnd" || status === "invisible") {
        bot.user.setStatus(status);
        console.log("Changed Status to " + status);
    } else {
        console.log("Couldn't change status - invalid value was passed");
    }
}
//Checks if the user who called a command that requires special access has the permissions to do so. Returns true if okay. 
function accessCheck(msg, requiredAccess, punishment) {
    if (!userlist.mods.hasOwnProperty(msg.author.id) || userlist.mods[msg.author.id].access < requiredAccess) {
        if (!punishment === false) { //...if not false (bool) to allow passing the punishment directly
            applyBotBan("<@!" + msg.author.id + ">", punishment);
        }
        msg.channel.sendMessage("Access denied.");
        return false;
    } else {
        return true;
    }
}
//Used to show banned people for how long they are banned.
function bannedFor(expires) {
    if (expires === "never") {
        return "three thousand eternities *(permanent)*";
    } else {
        let time = (expires - new Date()) / 1000;
        if (time > 60) { //more than 60 seconds
            time = Math.ceil(time / 60);
            if (time > 60) { //more than 60 minutes
                time = Math.ceil(time / 60);
                if (time > 24) { //more than 24 hours
                    time = Math.ceil(time / 24);
                    return time + " days";
                }
                return time + " hours";
            } else {
                return time + " minutes";
            }
        } else {
            return time + " seconds";
        }
    }
}
//Applies botbans to users. 
function applyBotBan(mention, time) {
    console.log(mention, time);
    if (mention) {
        if (!mention.startsWith("<@")) {
            return ("You asked me to botban someone, but you didn't provide a valid mention. Did the user leave the Guild?");
        } else {
            let bannedUser = mention.substring(3, mention.length - 1);
            if (userlist.mods.hasOwnProperty(bannedUser) && userlist.mods[bannedUser].access >= settings.ban_immunity) {
                return ("The user you tried to ban is immune!");
            }
            if (!time) {
                time = settings.default_bantime;
            }
            if (time === "never") {
                addBotBan(bannedUser, "never");
                return ("The user with the ID " + bannedUser + " has been permanently botbanned.");
            } else if (time.endsWith("s")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setSeconds(expirytime.getSeconds() + bantime);
                addBotBan(bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("m")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setMinutes(expirytime.getMinutes() + bantime);
                addBotBan(bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("h")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setHours(expirytime.getHours() + bantime);
                addBotBan(bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else if (time.endsWith("d")) {
                let expirytime = new Date();
                let bantime = Number(time.substring(0, time.length - 1));
                expirytime.setDate(expirytime.getDate() + bantime);
                addBotBan(bannedUser, expirytime.getTime());
                return ("The user with the ID " + bannedUser + " has been botbanned for " + time);
            } else {
                return ("You asked me to botban the user with the ID " + bannedUser + " for a specific time, but you didn't provide a valid time.");
            }
        }
    } else {
        return ("You asked me to botban someone, but you didn't provide a mention.");
    }
}
//Used in applyBotBan to check if the user is already botbanned. If not, create new entry. If they are, update expiry date.
function addBotBan(id, expirytime) {
    if (!userlist.banned.hasOwnProperty(id)) {
        userlist.banned[id] = {};
    }
    userlist.banned[id].expires = expirytime;
    userlist.banned[id].id = Number(id);
    fs.writeFile('./data/userlist.json', JSON.stringify(userlist,"  ","  "));
    if (settings.useDiscordRoles) {
        if (!settings.botbanned_role_id) {
            msg.channel.sendMessage("You didn't set up a botbanned role!");
        } else {
            //Do shit to assign a role
        }
    }
}
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
        var call = msg.content.substring(settings.prefix.length);
        call = call.split(" ");
        if (commands.hasOwnProperty(call[0])) { //Is this command valid?
            let useraccess;
            if (!userlist.mods.hasOwnProperty(msg.author.id)) {useraccess = 0} else {useraccess = userlist.mods[msg.author.id].access} //set useraccess
            if (commands[call[0]].access <= useraccess) { //Is useraccess equal or greater than commands.command.access?
                console.log(msg.author.username + " called command: " + call); //run command
                var fn = commands[call[0]].function;
                if (typeof fn === 'function') { //Is the function that executes the command available?
                    fn(msg);
                } else { //Function not found
                    console.log("Fatal error - function not resolvable");
                }
            } else { //Useraccess was smaller than command access value
                console.log(msg.author.username+" called command "+call+" but doesn't have access: "+useraccess+"<"+commands[call[0]].access);
                msg.channel.sendMessage("You do not have access to this command. | "+useraccess+"<"+commands[call[0]].access);
                if (!commands[call[0]].punishment === false) {
                    applyBotBan("<@"+msg.author.id+">",commands[call[0]].punishment);
                    console.log("Automatically botbanned user.");
                }
            }
        } else { //User entered unknown command
            console.log(msg.author.username + " called an unknown command: " + call);
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
    setGame(settings.default_game);
});

bot.login(settings.token);