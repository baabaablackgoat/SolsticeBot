module.exports = function (msg) {
    if (currentlyPlaying != "") {
        msg.channel.send("Currently Playing: " + currentlyPlaying);
    } else {
        msg.channel.send("Not playing anything right now.");
    }
}