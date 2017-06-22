const play = require("./cmds/play.js");
const debug = require("./cmds/debug.js");
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
    }
};