const play = require("./cmds/play.js");
const skip = require("./cmds/skip.js");
const debug = require("./cmds/debug.js");
const hugs = require("./cmds/hugs.js");
const giveme = require("./cmds/giveme.js");
const nowplaying = require("./cmds/nowplaying.js");
module.exports = {
    play: {
        function: play,
        aliases: ["play","addtoqueue"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Make me play something in VC.",
            long: "This command will add music or sounds to the current queue.",
            args: "(link || filename)",
        }
    },
    nowplaying: {
        function: nowplaying,
        aliases: ["playing","np","nowplaying","currentsong","thefuckihear"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Okay Google, what am I listening to?",
            long: "Tells you the song the bot is currently playing.",
            args: false,
        }
    },
    skip: {
        function: skip,
        aliases: ["skip","next"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "(Vote)skips the current song.",
            long: "This command will, depending on your access rights and/or global settings, either vote to skip or skip the current song instantly.",
            args: false,
        }
    },
    giveme: {
        function: giveme,
        aliases: ["giveme","giverole"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Assign yourself certain roles.",
            long: "Use this command to give yourself predefined roles, or take them away again - depending on the role. \nYou might need to either have (or not have) a certain (set of) roles or need to be a member of the server for a certain amount of time to use the giveme.",
            args: "rolename or `list`",
        }
    },
    debug: {
        function: debug,
        aliases: ["test","debug"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Debug command",
            long: "Used to debug solstice. No fixed usage.",
            args: false,
        }
    },
    hugs: {
        function: hugs,
        aliases: ["hug","huggu","hugs"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: false,
        help: {
            short: "*huggu*",
            long: "Do you need a hug? <w<",
            args: false,
        }
    }
};