module.exports = function (bot, msg, args, options) {
    if (!args[0] && bot._instance.dispatcher) {
        msg.channel.sendMessage("The current volume is " + bot._instance.dispatcher.volume);
    } else if (!bot._instance.dispatcher) {
        msg.channel.sendMessage("Sound Dispatcher is offline.");
    } else {
        if (args[0] >= 0 && args[0] <= 2) {
            bot._instance.dispatcher.setVolume(args[0]);
            msg.channel.sendMessage("Volume has been set to " + args[0]);
        } else {
            msg.channel.sendMessage("Error! Volume can only be set between 0 and 2. Your value " + args[0] + " is out of bounds!");
        }
    }
}