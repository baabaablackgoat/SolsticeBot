module.exports = function (msg) {
    disconnect(msg);
    msg.channel.sendMessage(msg.member.nickname+", no! I will not smash the sun! *shattering sound*");
    setTimeout(process.exit, 1000);
};