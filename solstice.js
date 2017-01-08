"use strict";

const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const bot = new Discord.Client();
const settings = require("./settings.js");
const stream = require('stream');
const fs = require('fs');
var queue = [], playing = false, currentlyPlaying = ""; // global vars for the music bot
var user = [], votes = {}; // global vars for the voting system
let dispatcher, userVoice, VoiceConnection; //That's the voice channel the bot is talking in

//Global functions
//Joins the voicechannel of the message author
//Voice connection is asynchronous, takes up to 1000ms
function joinChannel(msg){
	if(typeof VoiceConnection === 'undefined' || !VoiceConnection ){
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
function refreshUser(){
	user = [];
	userVoice.members.array().forEach(function(GuildMember){
		if(GuildMember["user"] && !GuildMember["user"].bot){
			user.push(GuildMember["user"]);
		}
	});
}
//voting function: action acts as id, each vote has a array of client-ids of client that accepted the vote
//if more than 50% of the current clients in the voice channel voted(yes), the function returns true
function vote(msg,voteAction){
	if(!votes[voteAction]){
		votes[voteAction] = [msg.author.id];
	} else {
		votes[voteAction].push(msg.author.id);
	}
	
	if(evaluteVote(msg, voteAction)){
		votes[voteAction] = [];
		return true;
	} else {
		return false;
	}	
}
//checks if vote is now passed
function evaluteVote(msg, voteAction){
	refreshUser();
	var all = user.length;
	var voted = 0;
	user.forEach(function(currentUser){
		if(votes[voteAction].indexOf(currentUser.id) > -1){
			voted += 1;
		}
	});
	msg.channel.sendMessage(voteAction + ": " + voted + " / " + all);
	return ((voted / all) >= 0.5);
}
//Checks the current queue. If no song is playing,  the queue jumpstarts
function checkQueue(msg){
    if (typeof msg.member.voiceChannelID === "undefined") {
        msg.channel.sendMessage("You're not in a voicechannel! Couldn't join a voice channel.");
    } else {
        if(!playing && queue.length > 0){
            joinChannel(msg);
            var item = queue.shift();
            setTimeout(function(){
                playFromQueue(msg, item);
            }, 500);
        } else if (!playing && dispatcher){
			currentlyPlaying = "";
            disconnect(msg);
        }
    }
}
//Adds a song to the queue
function addtoQueue(msg,item){
	queue.push(item);
	msg.channel.sendMessage(item["name"] + " was added to queue! Position: " + parseInt(queue.length));
}
//Plays the topmost song in the queue
function playFromQueue(msg, item){
	if(typeof VoiceConnection !== 'undefined' && VoiceConnection ){
		votes["Skip current Song"] = []; // reset vote skip
		msg.channel.sendMessage("Now Playing: " + item["name"]);
		currentlyPlaying = item["name"];
        setGame(item["name"]);
		
		if(item["stream"]){			
			var readable = ytdl(item["value"], {'filter': 'audioonly'});
			dispatcher = VoiceConnection.playStream(readable);			
		} else {
			dispatcher = VoiceConnection.playFile(item["value"]);
		}
		
		dispatcher.on('end',function(){
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
		setTimeout(function(){
			playFromQueue(msg, item);
			console.log("retry");
		}, 100);
	}	
};
//Modifies the bot's game
function setGame(game){
    if (typeof game === "string") {
        bot.user.setGame(game);
        console.log("Changed Game presence to "+ game);
    }
}
//Modifies the bot's status (takes online,idle,dnd,invisible)
function setStatus(status){
    if (status === "online" || status === "idle" || status === "dnd" || status === "invisible"){
        bot.user.setStatus(status);
        console.log("Changed Status to "+ status);
    } else {
        console.log("Couldn't change status - invalid value was passed");
    }
}
// Ends the current dispatcher to jump to the next song
const nextSong = function(msg){
	if(vote(msg,"Skip current Song")){
		dispatcher.end();
		setGame(settings.default_game);
	}
}
// Runs nextSong and clears queue.
const flushQueue = function(msg){
	queue = [];
	dispatcher.end();
	setGame(settings.default_game);
}
//Lists current queue.
const infoQueue = function(msg){
	if(queue.length > 0){
		var msgString = "Currently in Queue: \n" ;
		var i = 1;
		var item;
		
		msgString += "0: " + currentlyPlaying + "\n";
		
		queue.forEach(function(item){
			msgString += i + ": " + item["name"] + "\n";
			i+=1;
		});
	} else if(playing){
		nowPlaying(msg);
	} else {
		var msgString = "There aren´t any items in the queue right now." ;
	}
	
	msg.channel.sendMessage(msgString);
}
//Debug
const debug = function (msg) {
    msg.channel.sendCode("js", "//Debug function executed");
    console.log(queue);
};
//Ping, Pong!
const ping = function (msg) {
    msg.channel.sendMessage("Pong!");
};
//Stop the current node.js process with an exit message - if called by the bot owner, only. 
const terminate = function (msg) {
    if (msg.author.id === settings.owner_id) {
		disconnect(msg);
        msg.channel.sendMessage("Niklas, no! I will not smash the sun! *shattering sound*");
        setTimeout(process.exit,1000);
    } else {
        msg.channel.sendMessage(msg.author.username+ ", no! I will not smash the sun!");
    }
};
//Music and predefined files
const play = function (msg) {
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (call[1]) {
        var file = files[call[1]];
        if (call[1].toLowerCase() in files) {
			var item = {"name":call[1],"stream":false,"value":"./sounds/"+files[call[1]]};
			addtoQueue(msg,item);
			checkQueue(msg);
        } else if(call[1].startsWith("https://youtu.be") || call[1].startsWith("https://www.youtube.com")) {
            msg.channel.sendMessage("Grabbing metadata...");
			var ytInfo = ytdl.getInfo(call[1], { filter: "audioonly" },function(err, info){
				if(!err){
					var item = {"name":info["title"],"stream":true,"value":call[1]};
					addtoQueue(msg,item);
					checkQueue(msg);
				} else {
					msg.channel.sendMessage("Stream not found!");
					console.log(err);
				}
			});
        } else {
			msg.channel.sendMessage("File/Meme not found");
        }
    } else {
        msg.channel.sendMessage("**REEEEEE**, it's `" + settings.prefix + "play [filename/link]`");
    }
};
//says song that is currently playing
const nowPlaying = function(msg) {
	if(currentlyPlaying != ""){
		msg.channel.send("Currently Playing: " + currentlyPlaying);
	} else {
		msg.channel.send("Not playing anything right now.");
	}
}
//Disconnect the bot from the voice channel.
const disconnect = function (msg) {
    if (dispatcher) {
        dispatcher.end("Halted by user");
        flushQueue(msg);
        userVoice.leave();
        msg.channel.send("Left voice channel.");
        dispatcher = null;
        VoiceConnection = null;
        setGame(settings.default_game);
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
                setGame(settings.default_game);
            }
        });
    });
}
//Return information about the user
const userinfo = function (msg) {
    let reply = new Discord.RichEmbed();
    console.log(msg.member);
    reply.addField("User ID",msg.author.id);
    reply.addField("Account age",Math.floor(((new Date()-msg.author.createdAt)/86400000))+" days ago"+" | "+msg.author.createdAt);
    reply.addField("Avatar",msg.author.avatarURL);
    reply.setColor(msg.member.highestRole.color);
    reply.setImage(msg.author.avatarURL);
    reply.timestamp = new Date();
    reply.setAuthor("Solstice User Info | "+msg.author.username+"#"+msg.author.discriminator,bot.user.avatarURL);
    msg.channel.sendEmbed(reply); 
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
//volvo pls fix
const fix = function(msg){
    msg.channel.sendMessage("volvo, pls fix http://starecat.com/content/wp-content/uploads/engineer-engifar-engiwherever-you-are-titanic.jpg");
}
//we'll bang okay
const bang = function(msg){
    msg.channel.sendMessage("We'll bang, okay? :gun:");
}
const commands = {
    debug: debug,
    ping: ping,
    memes: memes,
    play: play,
    music: play,
    skip: nextSong,
	next: nextSong,
    clear: flushQueue,
	flush: flushQueue,
	queue: infoQueue,
	np: nowPlaying,
    disconnect: disconnect,
    dc: disconnect,
    volume: volume,
    vol: volume,
    userinfo: userinfo,
    fuck: fuck,
    fix: fix,
    bang: bang,
    break: terminate,
    die: terminate,
    terminate: terminate,
    smash: terminate
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
    setGame(settings.default_game);
});

bot.login(settings.token);