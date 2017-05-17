module.exports = function(bot){
    let now = new Date();
    let reminders = bot.globalVars.remindMe;
    for (let i in reminders) {
        if (now.getTime() > reminders[i].target) {
            console.log("expired: UserID/key"+i);
            let targetchannel = bot.channels.get(reminders[i].channel);
            targetchannel.sendMessage("<@"+i+">, you asked me to remind you of: `"+reminders[i].text+"`").then(() => {
                console.log("Reminder deployed - ID "+i);
                delete reminders[i]; //deletes the reminder entry
            });
        }
    }
};
