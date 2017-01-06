const Discord = require("discord.js");
const bot = new Discord.Client();
const settings = require("./settings.js");

//Debug
var debug = function(msg){
    msg.channel.sendMessage("```Debug executed, check console```");
    //console.log(bot.channels.178531551015993344);
}
//Ping, Pong!
var ping = function(msg){
    msg.channel.sendMessage("Pong!");
}
//Stop the current node.js process with an exit message - if called by the bot owner, only. 
var terminate = function(msg){
    if (msg.author.id === settings.owner_id) {
        msg.channel.sendMessage("...I understand.");
        bot.destroy();
        setTimeout(bot.login(token), 1000);
    } else {
        msg.channel.sendMessage("Ha, no, fuck you!");
    }
}
//Play a predefined file (see files object)
var play = function(msg){
    const files = {
        cena: "cena.mp3",
        holzbrett: "holzbrett.mp3"
    };
    var call = msg.content.substring(prefix.length);
    call = call.split(" ");
    if (call[1].toLowerCase() in files) {
        console.log(msg.author);
        /*
        console.log(voiceChannel.name);
        msg.author.voiceChannel.join()
        setTimeout(voiceChannel.leave(),1000);
        */
    } else {
        msg.channel.sendMessage("File/Meme not found."); 
    }
}
//Return information about the user
var userinfo = function(msg){
    /*
    var reply = new Discord.RichEmbed();
    reply.color = 0;
    reply.addField(msg.author.username+"#"+msg.author.discriminator);
    msg.channel.sendMessage(reply);
    */
}

const commands = {
    debug: debug,
    ping: ping,
    play: play,
    userinfo: userinfo,
    die: terminate,
    terminate: terminate
};

bot.on("message", msg => {
    if (msg.content.startsWith(settings.prefix) && !msg.author.bot){
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
        } else {console.log(msg.author.username + " called an unknown command: " + call);
            msg.channel.sendMessage("Unknown command.");
        }
    }
});

bot.on("ready", () => {
    console.log("Solstice is ready.");
})

bot.login(settings.token);