const timeparse = require("./../modules/timeparse");
const discord = require("discord.js");
const createReminder = function (bot,msg,input){
    bot._reminders[input.author] = {
        target: new Date().getTime()+input.duration,
        msg: input.msg,
        channel: msg.channel.id
    };
    msg.channel.send(`I will remind you of \`${bot._reminders[input.author].msg}\` at ${new Date(bot._reminders[input.author].target).toUTCString()}.`);
};

module.exports = function(bot,msg,args,options){
    if (bot._reminders.hasOwnProperty(msg.author.id)) {
        msg.channel.send(`You already have an existing reminder for \`${bot._reminders[msg.author.id].msg}\`. Use \`remindme clear\` to clear the reminder.`);
        return;
    }
    if (!args[0]){
        msg.channel.send(`You asked me to remind you of something, but you provided no time!`);
    }
    if (["clear","remove","stop","delete"].includes(args[0])){
        msg.channel.send(`Your reminder for \`${bot._reminders[msg.author.id].msg}\` was removed.`);
        return;
    }
    let duration = timeparse(args[0]);
    if (duration) {
        if (args[1]){
            createReminder(bot,msg,{duration:duration,msg:args[1],author:msg.author.id});
        } else {
            msg.channel.send(`What should I remind you of?`);
            let listener = new discord.MessageCollector(msg.channel,collected=>collected.author.id===msg.author.id,{maxMatches:1,time:20000});
            listener.on("end",(collection,reason)=>{
                if (reason === "time") {
                    msg.channel.send(`Message collector has timed out.`);
                } else {
                    let keys = Array.from(collection.keys());
                    createReminder(bot,msg,{duration:duration,msg:collection.get(keys[0]).content,author:msg.author.id});
                }
            });
        }
    }
};