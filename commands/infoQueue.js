module.exports = function (bot,msg,args,options) {
    if (queue.length > 0) {
        var msgString = "Currently in Queue: \n";
        var i = 1;
        var item;

        msgString += "0: " + currentlyPlaying + "\n";

        queue.forEach(function (item) {
            msgString += i + ": " + item["name"] + "\n";
            i += 1;
        });
    } else if (playing) {
        const nowPlaying = require("./../methods/nowPlaying");
        nowPlaying(msg);
    } else {
        var msgString = "There aren´t any items in the queue right now.";
    }

    msg.channel.sendMessage(msgString);
}