//Modifies the bot's status (takes online,idle,dnd,invisible)
module.exports = function(status) {
    if (status === "online" || status === "idle" || status === "dnd" || status === "invisible") {
        bot.user.setStatus(status);
        console.log("Changed Status to " + status);
    } else {
        console.log("Couldn't change status - invalid value was passed");
    }
}