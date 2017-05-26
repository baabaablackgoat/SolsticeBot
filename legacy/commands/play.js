const ytdl = require("ytdl-core");
const files = require("./../data/files");
const addtoQueue = require("./../methods/addtoQueue");
const checkQueue = require("./../methods/checkQueue");

module.exports = function (bot, msg, args, options) {
    if (args[0]) {
        if (args[0].toLowerCase() === "random" || args[0].toLowerCase() === "rdm") {
            const temp = Object.keys(files);
            args[0] = temp[Math.floor(Math.random() * temp.length)];
            msg.channel.send(":heart::spades::heart::spades: Playing: " + args[0]);
        }
        if (args[0].toLowerCase() in files) {
            let item = {
                "name": args[0],
                "stream": false,
                "value": "./sounds/" + files[args[0]]
            };
            addtoQueue(bot, msg, item);
            checkQueue(bot, msg, args, options);
        } else if (args[0].startsWith("https://youtu.be") || args[0].startsWith("https://www.youtube.com")) {
            msg.channel.send("Grabbing metadata...");
            ytdl.getInfo(args[0], {
                filter: "audioonly"
            }, function (err, info) {
                if (!err) {
                    let item = {
                        "name": info.title,
                        "stream": true,
                        "value": args[0]
                    };
                    addtoQueue(bot, msg, item);
                    checkQueue(bot, msg, args, options);
                } else {
                    msg.channel.send("Stream not found!");
                    console.log(err);
                }
            });
        } else {
            msg.channel.send("File/Meme not found");
        }
    } else {
        msg.channel.send("**REEEEEE**, it's `" + options.settings.prefix + "play [filename/link]`");
    }
};