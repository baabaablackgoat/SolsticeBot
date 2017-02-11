"use strict";

const Discord = require("discord.js");
const bot = new Discord.Client();
const userlist = require('./data/userlist.json');
const settings = require("./settings");
const parseCommands = require("./methods/parseCommands");
const accessCheck = require("./methods/accessCheck");
const giveAccess = require("./methods/giveAccess");
const commands = require("./data/commands");
const setGame = require("./methods/setGame");
const bannedFor = require("./methods/bannedFor");
const commandKeys = Object.keys(commands); 
let logchannel;

bot._instance = {
    queue: [],
    playing: false,
    currentlyPlaying: "",
    user: [],
    votes: {},
    dispatcher: null,
    userVoice: null,
    VoiceConnection: null,
};

bot.on("message", msg => {
    //User Mutes
    if (userlist.muted.hasOwnProperty(msg.author.id)){
        if (userlist.muted[msg.author.id].expires === "never" || userlist.muted[msg.author.id].expires > new Date()) {
            msg.delete();
            msg.channel.sendMessage("`Your message was automatically deleted since you are muted.`")
                .then(response => response.delete(3000));
                return; //Avoid calling the other stuff the bot provides
        }
    }


    //Bot commands from here on
    if (msg.content.startsWith(settings.prefix) && !msg.author.bot) { //Invoker? Not a bot user?
        if (userlist.banned.hasOwnProperty(msg.author.id)) {
            if (userlist.banned[msg.author.id].expires === "never" || userlist.banned[msg.author.id].expires > new Date()) {
                msg.channel.sendMessage("<@" + msg.author.id + ">, you are botbanned for another " + bannedFor(userlist.banned[msg.author.id].expires));
                console.log(msg.author.username + " attempted to use a command but is banned");
                return;
            }
        }
        let raw = msg.content.substring(settings.prefix.length);
        let call = parseCommands(raw);

        const commandCheck = function(call) {
            for (let i = 0; i < commandKeys.length; i++) {
                if (commands[commandKeys[i]].aliases.indexOf(call.name.toLowerCase()) > -1) {
                    return commands[commandKeys[i]];
                }
            }
            //If the function didn't return early / quit the for loop
            return false;
        };

        let command_id = commandCheck(call);
        if (command_id) {
            let useraccess;
            if (!userlist.mods.hasOwnProperty(msg.author.id)) {
                useraccess = 0;
            } else {
                useraccess = userlist.mods[msg.author.id].access;
            } //set useraccess
            if (accessCheck(msg, command_id.access, command_id.punishment)) { //Is useraccess equal or greater than commands.command.access?
                console.log(msg.author.username + " called command: " + call.name + " " + call.args.join(",")); //run command
                let fn = command_id.function;

                if (typeof fn === 'function') { //Is the function that executes the command available?
                    let args = call.args;
                    let options = {
                        "access": command_id.access,
                        "useraccess": useraccess,
                        "callname": call.name,
                        "settings": settings,
                    };

                    fn(bot, msg, args, options);
                } else { //Function not found
                    console.log("Fatal error - function not resolvable");
                }
            }

        } else { //User entered unknown command
            console.log(msg.author.username + " called an unknown command: " + call.name);
            msg.channel.sendMessage("Unknown command. `" + settings.prefix + "help`");
        }
    }
});

bot.on("ready", () => {
    //The following block automatically adds the bot owner to the mods userlist, with an access value of 99. This should always grant an override.
    if (!settings.owner_id) {
        console.log("No owner ID set! Terminate the bot process (hold ctrl+c in your console) and add it.");
    } else {
        let options = {"settings": settings,};
        giveAccess([settings.owner_id], 99, true, bot, null, null, options);
    }
    setGame(bot, settings.default_game);
    console.log("Solstice is ready.");
    if (settings.modlog.enabled) {
        logchannel = bot.channels.get(settings.modlog.channel_id);
    }
});

bot.on("reconnecting", () => {
    console.log("Lost connection! Attempting to reconnect...");
});

bot.on("error", err => {
    console.error(err);
});

bot.on("messageDelete", msg => {
    if (settings.modlog.enabled && settings.modlog.messages.delete && !msg.author.bot) {
        let reply = new Discord.RichEmbed();
        reply.setAuthor(msg.author.username,msg.author.avatarURL);
        reply.setTitle("Message deleted from #"+msg.channel.name+", Message ID:`"+msg.id+"`");
        reply.setDescription("```fix\n"+msg.content+"\n```");
        reply.setColor([255,125,180]);
        reply.setTimestamp(new Date());
        logchannel.sendEmbed(reply);
    }
});

bot.on("messageDeleteBulk", msgs => {
    if (settings.modlog.enabled && settings.modlog.messages.purge) {
        let msgArray = msgs.array();
        let reply = new Discord.RichEmbed();
        reply.setAuthor("#"+msgArray[0].channel.name+" purged", bot.user.avatarURL);
        reply.setTitle(msgArray.length+" messages have been deleted.");
        reply.setColor([255,0,0]);
        reply.setTimestamp(new Date());
        logchannel.sendEmbed(reply);
    }
});

bot.on("messageUpdate", (msg_old,msg_new) => {
    if (settings.modlog.enabled && settings.modlog.messages.edit.enabled && !msg_old.author.bot && msg_old) {
        let reply = new Discord.RichEmbed();
        if (msg_old.content !== msg_new.content) {
            if (settings.modlog.messages.edit.old_content) {
                reply.addField("Former Message: ",msg_old.content);
            }
             if (settings.modlog.messages.edit.new_content) {
                reply.addField("New Message: ",msg_new.content);
            }
        }
        if (msg_old.attachments !== msg_old.attachments) {
            if (settings.modlog.messages.edit.old_content) {
                reply.addField("Former Attachments: ",msg_old.attachments);
            }
            if (settings.modlog.messages.edit.new_content) {
                reply.addField("New Attachments: ",msg_new.attachments);
            }
        }
        reply.setAuthor(msg_new.author.username,msg_new.author.avatarURL);
        reply.setTitle("Message edited in #"+msg_new.channel.name+", Message ID:`"+msg_new.id+"`");
        reply.setColor([0,125,255]);
        reply.setTimestamp(msg_new.editedAt);
        logchannel.sendEmbed(reply);
    }
});

bot.on("channelCreate", channel => {
    if (settings.modlog.enabled && settings.modlog.server.channelCreate) {
        let reply = new Discord.RichEmbed();
        reply.setAuthor("Channel created", channel.guild.iconURL);
        reply.setTitle("#"+channel.name);
        reply.setColor([125,255,0]);
        reply.setTimestamp(new Date());
        logchannel.sendEmbed(reply);
    }
});

bot.on("channelDelete", channel => {
    if (settings.modlog.enabled && settings.modlog.server.channelCreate) {
        let reply = new Discord.RichEmbed();
        reply.setAuthor("Channel deleted", channel.guild.iconURL);
        reply.setTitle("#"+channel.name);
        reply.setColor([255,125,0]);
        reply.setTimestamp(new Date());
        logchannel.sendEmbed(reply);
    }
});

bot.on("guildMemberAdd", member => {
    if (settings.modlog.enabled && settings.modlog.members.join) {
        let reply = new Discord.RichEmbed();
        reply.setAuthor("Member joined", member.user.avatarURL);
        reply.setTitle(member.user.username);
        reply.setDescription("Account age: "+Math.floor(((new Date() - member.user.createdAt) / 86400000))+" days (see timestamp)");
        reply.addField("New user count:", logchannel.guild.members.size);
        reply.setColor([255,255,0]);
        reply.setTimestamp(member.user.createdAt);
        logchannel.sendEmbed(reply);
    }
});

bot.on("guildMemberRemove", member => {
    if (settings.modlog.enabled && settings.modlog.members.join) {
        let reply = new Discord.RichEmbed();
        reply.setAuthor("Member left/was kicked", member.user.avatarURL);
        reply.setTitle(member.user.username);
        reply.setDescription("Joined "+Math.floor((new Date() - member.joinedTimestamp)/86400000)+" days ago (see timestamp)");
        reply.addField("New user count:", logchannel.guild.members.size);
        reply.setColor([125,75,0]);
        reply.setTimestamp(member.joinedAt);
        logchannel.sendEmbed(reply);
    }
});

bot.login(settings.token);