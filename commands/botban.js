module.exports = function (msg) {
    var raw = msg.content.substring(settings.prefix.length);
    let call = parseCommands(raw);
    msg.channel.sendMessage(applyBotBan(call.args[0], call.args[1]));
};