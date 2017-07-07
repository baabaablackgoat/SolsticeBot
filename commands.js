const play = require("./cmds/play.js");
const nowplaying = require("./cmds/nowplaying.js");
const search = require("./cmds/search.js");
const skip = require("./cmds/skip.js");
const forceskip = require("./cmds/forceskip.js");
const queue = require("./cmds/queue.js");
const clearqueue = require("./cmds/clearqueue.js");

const help = require("./cmds/help.js");
const giveme = require("./cmds/giveme.js");
const hugs = require("./cmds/hugs.js");
const remindme = require("./cmds/remindme.js");

const bang = require("./cmds/bang.js");
const cock = require("./cmds/cock.js");
const fix = require("./cmds/fix.js");
const fuck = require("./cmds/fuck.js");
const hentie = require("./cmds/hentie.js");

const debug = require("./cmds/debug.js");
const endprocess = require("./cmds/endprocess.js");

/* A note on Access settings
    If a command access check should be bypassed, use false. Don't just leave an empty string, object or array, it could screw things up.

    Access permission settings can either be a string - or if you need multiple permissions _at the same time_, use an array.
    access.permissions should be a PermissionResolvable, preferably the string. More information here: https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS

    Role permissions are defined within an object like this: {
        ids: [""] //Array with all required role ids
        require_all: (boolean), //If true, the user needs every single specified role. If false, one role out of the list suffices.
    }
    For the love of god, don't just specify ids as a string. You can and will fuck up if you do that.

    user_lists are predetermined constants that are stored in the data folder. Currently, they cannot be tinkered with from within the bot.
*/



module.exports = {
    play: {
        function: play,
        aliases: ["play","addtoqueue"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Voteskips the current song.",
            long: "Using this command will cast your vote to skip the currently running song.",
            args: false,
        }
    },
    forceskip: {
        function: forceskip,
        aliases: ["forceskip","forcenext"],
        access: {
            permissions: "MANAGE_CHANNELS",
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Forcefully skips the current song.",
            long: "Automatically skips the currently running song.",
            args: false,
        }
    },
    queue: {
        function: queue,
        aliases: ["queue","listqueue","showqueue"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Lists the currently queued songs/files.",
            long: "Lists Song/Filename, issued Voice Channel, and Issuing User of all the songs currently in the player queue. If given an arg, only shows the songs queued by the given user.",
            args: "[user]",
        }
    },
    clearqueue: {
        function: clearqueue,
        aliases: ["clearqueue","clear"],
        access: {
            permissions: "MANAGE_CHANNELS",
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Clears the player queue.",
            long: "Clears the player queue. If given an argument that resolves to a user, only clears songs queued by this user.",
            args: "[user]",
        }
    },
    
    help: {
        function: help,
        aliases: ["help","whatis","whatintarnationis"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Get help on my commands.",
            long: "Either lists all commands, if given no arguments - or instead shows information about the passed command.",
            args: "[commandname]",
        }
    },

    giveme: {
        function: giveme,
        aliases: ["giveme","giverole"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
    remindme: {
        function: remindme,
        aliases: ["remindme","reminder"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
        },
        punishment: false,
        hidden: false,
        log: true,
        help: {
            short: "Reminds the caller of something.",
            long: "Pings the user after the specified time in the channel this command was issued in with a message of their choice.",
            args: "(time-amount),[text]",
        }
    },

    // ### Joke Commands ###
    bang: {
        function: bang,
        aliases: ["bang"],
        access: {
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
            permissions: false,
            roles: false,
            user_lists: false,
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
    //### All commands below this line need to be called by users that have been manually entered by ID! (access.user_list = owner)
    debug: {
        function: debug,
        aliases: ["debug","test"],
        access: {
            permissions: false,
            roles: false,
            user_lists: "owner",
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
            permissions: false,
            roles: false,
            user_lists: "owner",
        },
        punishment: false,
        hidden: true,
        log: true,
        help: {
            short: "Terminates the bot process.",
            long: "Terminates the bot process. Only available to the bot owner. If the bot was started with `node run_respawn`, the bot will restart - if possible.",
            args: false,
        }
    },
};