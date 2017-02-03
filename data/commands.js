//Define commands
const help = require("./../commands/help.js");
const debug = require("./../commands/debug.js");
const ping = require("./../commands/ping.js");
const memes = require("./../commands/memes.js");
const play = require("./../commands/play.js");
const nextSong = require("./../commands/nextSong.js");
const flushQueue = require("./../commands/flushQueue.js");
const infoQueue = require("./../commands/infoQueue.js");
const nowPlaying = require("./../commands/nowPlaying.js");
const disconnect = require("./../commands/disconnect.js");
const volume = require("./../commands/volume.js");
const userinfo = require("./../commands/userinfo.js");
const fuck = require("./../commands/fuck.js");
const bang = require("./../commands/bang.js");
const fix = require("./../commands/fix.js");
const botban = require("./../commands/botban.js");
const terminate = require("./../commands/terminate.js");
const accessRefresh = require("./../commands/accessRefresh.js");
const assignAccess = require("./../commands/assignAccess.js");
const serverban = require("./../commands/ban.js");
const kick = require("./../commands/kick.js");
const roleban = require("./../commands/roleban.js");
const purge = require("./../commands/purge.js");

module.exports = {
    help: {
        function: help,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Show commands & indepth help",
            indepth: "Pass it a command name, and you shall recieve!",
            args: "[command]"
        },
        aliases: ["help"],
    },
    debug: {
        function: debug,
        access: 5,
        punishment: false,
        hidden: true,
        help: {
            text: "Runs the debug function",
            indepth: "I can't go against my programming. This will run whatever is in debug.",
            args: "No args specified"
        },
        aliases: ["debug"],
    },
    ping: {
        function: ping,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Pong!",
            indepth: "Ping, pong, and on, and on",
            args: false,
        },
        aliases: ["ping"],
    },
    memes: {
        function: memes,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Returns a random meme",
            indepth: "We are number one but it's actually the nutshack",
            args: "[memetype]",
        },
        aliases: ["memes","meme"],
    },
    play: {
        function: play,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Adds songs to the queue",
            indepth: "Adds either predefined local files or valid YouTube links to the music bot queue.",
            args: "[name or url]"
        },
        aliases: ["play","music"],
    },
    skip: {
        function: nextSong,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Voteskip the current song",
            indepth: "Adds your vote to voteskip the current song. If 50% or more of the VC attendants vote to skip, the next song plays.",
            args: false,
        },
        aliases: ["skip","next"],
    },
    clear: {
        function: flushQueue,
        access: 2,
        punishment: false,
        hidden: false,
        help: {
            text: "Empties the musicbot queue",
            indepth: "Clears out all entries in the current queue and disconnects the bot from any VC.", 
            args: false
        },
        aliases: ["clear","flush"],
    }, 
    queue: {
        function: infoQueue,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Lists the current queue",
            indepth: "Lists all current songs in the musicbot",
            args: false,
        },
        aliases: ["queue","q"],
    },
    np: {
        function: nowPlaying,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Shows current song",
            indepth: "Returns the song the musicbot is playing right now",
            args: false,
        },
        aliases: ["np","nowplaying"],
    },
    disconnect: {
        function: disconnect,
        access: 2,
        punishment: false,
        hidden: false,
        help: {
            text: "Disconnect from VC",
            indepth: "Disconnects the bot from any voicechannel it's connected to",
            args: false,
        },
        aliases: ["disconnect","dc"],
    },
    volume: {
        function: volume,
        access: 1,
        punishment: false,
        hidden: false,
        help: {
            text: "Changes musicbot volume",
            indepth: "Changes the volume the bot is playing audio with. Warning: Anything above 1.5 will sound distorted!",
            args: "[volume (0-2)]",
        },
        aliases: ["volume","vol"],
    },
    userinfo: {
        function: userinfo,
        access: 0,
        punishment: false,
        hidden: false,
        help: {
            text: "Shows user info",
            indepth: "Shows a few informations about the person calling the command or a mentioned user.",
            args: "[@mention]",
        },
        aliases: ["userinfo"],
    },
    fuck: {
        function: fuck,
        access: 0,
        punishment: false,
        hidden: true,
        help: {
            text: "...",
            indepth: "...",
            args: false,
        },
        aliases: ["fuck"],
    },
    bang: {
        function: bang,
        access: 0,
        punishment: false,
        hidden: true,
        help: {
            text: "We'll bang, okay?",
            indepth: "We'll bang, okay?",
            args: false,
        },
        aliases: ["bang"],
    },
    fix: {
        function: fix,
        access: 0,
        punishment: false,
        hidden: true,
        help: {
            text: "volvo, pls fix",
            indepth: "volvo, pls fix",
            args: false,
        },
        aliases: ["fix"],
    },
    accessRefresh: {
        function: accessRefresh,
        access: 10,
        punishment: false,
        hidden: false,
        help: {
            text: "Reloads Role Access Values",
            indepth: "Reloads all users that have the predefined roles and assigns them the predefined access values.",
            args: false,
        },
        aliases: ["accessrefresh","refreshaccess","reloadaccess","accessreload"],
    },
    assignAccess: {
        function: assignAccess,
        access: 10,
        punishment: false,
        hidden: false,
        help: {
            text: "Gives the mentioned user bot access.",
            indepth: "The mentioned user will recieve bot access as high as the specified level. Cannot assign a higher access level than the caller has.",
            args: "[@mention] [accesslevel]",
        },
        aliases: ["assignaccess","accessassign","giveaccess","setaccess"],
    },
    botban: {
        function: botban,
        access: 5,
        punishment: "15m",
        hidden: false,
        help: {
            text: "Bans a user from using the bot.",
            indepth: "Bans a mentioned user for a specified time. Set the time to 'never' and the ban will be permanent.",
            args: "[@mention] [time in letter notation (30m)]",
        },
        aliases: ["botban"],
    },
    ban: {
        function: serverban,
        access: 10,
        punishment: "45m",
        hidden: false,
        help: {
            text: "Bans a user from the server the message was sent in.",
            indepth: "Bans the mentioned user from the server.",
            args: "[@mention]",
        },
        aliases: ["ban"],
    },
    roleban: {
        function: roleban,
        access: 5,
        punishment: "15m",
        hidden: false,
        help: {
            text: "If enabled, rolebans a user.",
            indepth: "Rolebans the mentioned user. This basically means that this user is assigned a role that has been preconfigured to not allow chatting in any channel except for one.",
            args: "[@mention]",
        },
        aliases: ["roleban","toss"],
    },
    kick: {
        function: kick,
        access: 10,
        punishment: "15m",
        hidden: false,
        help: {
            text: "Kicks a user from the server the message was sent in.",
            indepth: "Kicks the mentioned user from the server.",
            args: "[@mention]",
        },
        aliases: ["kick"],
    },
    purge: {
        function: purge,
        access: 5,
        punishment: false,
        hidden: false,
        help: {
            text: "Removes messages based on given arguments.",
            indepth: "Purge deletes messages based on the arguments you give it. You can pass it user mention(s) to purge messages from this/these users, keyword(s) to remove all messages matching the keyword, etc. Entering a number will terminate the argument list and defines the amount of messages to scan. Only pass a number to remove all previous x messages.",
            args: "[@mentionA][@mentionB][keywordA][keywordB][messageCount]",
        },
        aliases: ["purge","remove"],
    },
    terminate: {
        function: terminate,
        access: 99,
        punishment: "30m",
        hidden: false,
        help: {
            text: "Stops the bot.",
            indepth: "Closes the node process after returning a goodbye message.",
            args: false,
        },
        aliases: ["terminate","break","die","exterminate","smash","end"],
    },
};