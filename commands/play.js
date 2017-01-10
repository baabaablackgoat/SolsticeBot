module.exports = function (msg) {
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (call[1]) {
        var file = files[call[1]];
        if (call[1].toLowerCase() in files) {
            var item = {
                "name": call[1],
                "stream": false,
                "value": "./sounds/" + files[call[1]]
            };
            addtoQueue(msg, item);
            checkQueue(msg);
        } else if (call[1].startsWith("https://youtu.be") || call[1].startsWith("https://www.youtube.com")) {
            msg.channel.sendMessage("Grabbing metadata...");
            var ytInfo = ytdl.getInfo(call[1], {
                filter: "audioonly"
            }, function (err, info) {
                if (!err) {
                    var item = {
                        "name": info["title"],
                        "stream": true,
                        "value": call[1]
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
        msg.channel.sendMessage("**REEEEEE**, it's `" + settings.prefix + "play [filename/link]`");
    }
};