module.exports = function (msg) {
    var call = msg.content.substring(settings.prefix.length);
    call = call.split(" ");
    if (!call[1] && dispatcher) {
        msg.channel.sendMessage("The current volume is " + dispatcher.volume);
    } else if (!dispatcher) {
        msg.channel.sendMessage("Sound Dispatcher is offline.");
    } else {
        if (call[1] >= 0 && call[1] <= 2) {
            dispatcher.setVolume(call[1]);
            msg.channel.sendMessage("Volume has been set to " + call[1]);
        } else {
            msg.channel.sendMessage("Error! Volume can only be set between 0 and 2. Your value " + call[1] + " is out of bounds!");
        }
    }
}