module.exports = function (bot,msg,args,options) {
    if (bot._instance.currentlyPlaying !== "") {
        msg.channel.send("Currently Playing: " + bot._instance.currentlyPlaying);
    } else {
        msg.channel.send("Not playing anything right now.");
    }
}