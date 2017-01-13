module.exports = function (bot,msg,args,options) {
    if (bot._instance.queue.length > 0) {
        var msgString = "Currently in Queue: \n";
        var i = 1;
        var item;

        msgString += "0: " + bot._instance.currentlyPlaying + "\n";

        bot._instance.queue.forEach(function (item) {
            msgString += i + ": " + item.name + "\n";
            i += 1;
        });
    } else if (bot._instance.playing) {
        const nowPlaying = require("./../methods/nowPlaying");
        nowPlaying(bot,msg,args,options);
    } else {
        var msgString = "There aren´t any items in the queue right now.";
    }

    msg.channel.sendMessage(msgString);
}