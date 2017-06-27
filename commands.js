const play = require("./cmds/play.js");
const nowplaying = require("./cmds/nowplaying.js");
const search = require("./cmds/search.js");
const skip = require("./cmds/skip.js");

const giveme = require("./cmds/giveme.js");
const hugs = require("./cmds/hugs.js");

const bang = require("./cmds/bang.js");
const cock = require("./cmds/cock.js");
const fix = require("./cmds/fix.js");
const fuck = require("./cmds/fuck.js");
const hentie = require("./cmds/hentie.js");

const debug = require("./cmds/debug.js");
const endprocess = require("./cmds/endprocess.js");

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
        },
    },
    search: {
        function: search,
        aliases: ["search", "yt"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Look up and automatically queue a song from YouTube.",
            long: "This command will look up the top three results of the query you enter, and ask you for confirmation. Upon confirmation, the video is added to the current music queue.",
            args: "query",
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
    },

    // ### Joke Commands ###
    bang: {
        function: bang,
        aliases: ["bang"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: ":gun:",
            long: ":gun:",
            args: false,
        }
    },
    cock: {
        function: cock,
        aliases: ["cock","upcock"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: ":chicken:",
            long: ":chicken:",
            args: false,
        }
    },
    fix: {
        function: fix,
        aliases: ["fix"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: "volvo, pls",
            long: "i require healing",
            args: false,
        }
    },
    fuck: {
        function: fuck,
        aliases: ["fuck","intercourse"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: ":no_mouth:",
            long: ":rolling_eyes:",
            args: false,
        }

    },
    hentie: {
        function: hentie,
        aliases: ["hentie","hentai"],
        access: {
            level: 0,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: "nsfw",
            long: "actually, nsfl",
            args: false,
        }

    },

    //### Bot Admin Commands ### 
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
    endprocess: {
        function: endprocess,
        aliases: ["endprocess","end","die","lightsout","lightsoff","restart","reboot","reset"],
        access: {
            level: 99,
            permission: false,
            role: false,
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: "Terminates the bot process.",
            long: "Terminates the bot process. Only available to the bot owner.",
            args: false,
        }
    },
};