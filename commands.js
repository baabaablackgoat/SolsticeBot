const debug = require("commands/debug.js");
module.exports = {
    debug: {
        function: debug,
        aliases: ["test","debug"],
        access: {
            level: 0,
            permission: false,
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