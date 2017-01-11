module.exports = function (bot,msg,args,options) {
    const ytdl = require("ytdl-core");
    const files = require("./../data/files");
    if (args[0]) {
        var file = files[args[0]];
        if (args[0].toLowerCase() in files) {
            var item = {
                "name": args[0],
                "stream": false,
                "value": "./sounds/" + files[args[0]]
            };
            const addtoQueue = require("./../methods/addtoQueue");
            const checkQueue = require("./../methods/checkQueue");
            addtoQueue(msg, item);
            checkQueue(msg);
        } else if (args[0].startsWith("https://youtu.be") || args[0].startsWith("https://www.youtube.com")) {
            msg.channel.sendMessage("Grabbing metadata...");
            var ytInfo = ytdl.getInfo(args[0], {
                filter: "audioonly"
            }, function (err, info) {
                if (!err) {
                    var item = {
                        "name": info["title"],
                        "stream": true,
                        "value": args[0]
                    };
                    addtoQueue(msg, item);
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
        msg.channel.sendMessage("**REEEEEE**, it's `" + options.settings.prefix + "play [filename/link]`");
    }
};