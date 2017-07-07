module.exports = function(bot){
    let now = new Date();
    for (let i in bot._reminders) {
        if (now > bot._reminders[i].target) {
            bot.channels.get(bot._reminders[i].channel).send("<@"+i+">, you asked me to remind you of `"+bot._reminders[i].msg+"`").then(() => {
                delete bot._reminders[i]; 
            });
        }
    }
};