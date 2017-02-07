//Reminder: If target.raw is greater or equal to 86400000, then the standard design (three day digits) will overflow! (1000 days)
//Do something about that.


const gm = require("gm");
module.exports = function(bot,msg,args,options) {
    let target;
    let remaining = {
        raw: 0,
        days: "0",
        hrs: "0",
        mins: "0",
        secs: "0",
    };
    let now = new Date();
    const offset = now.getTimezoneOffset();
    if (args.length < 1) {
        target = new Date(Date.UTC(2017,2,20));
    } else if (args.length > 1) { //User did not provide 1 (encased) argument => ignore input
        msg.channel.sendMessage("_tick, tock, **krrt**_ \nWhoops, too many arguments! Please provide only one argument. \n(Hint:  encase it in quotation marks)");
        return;
    } else { 
        target = new Date(args[0]);
        target.setMinutes(target.getMinutes + offset);
        if (isNaN(target)) {
            msg.channel.sendMessage("_tick, tock, **krrt**_ \n```fix\n"+target+"\n```\nWhoops! Something was wrong with your datestring. Your date returned as invalid. Make sure you use a JavaScript compatible Date format. \n https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date");
            return;
        }
    }
    if (target < now) {
        remaining.raw = 0;
    } else {
        remaining.raw = (target - now) / 1000;
    }
    console.log(target, now, remaining.raw);
    // remaining.raw = remaining.raw + (offset * 60) //account for timezone offsets
    remaining.secs = (Math.floor(remaining.raw % 60)).toString();
    remaining.mins = (Math.floor((remaining.raw % 3600) / 60)).toString();
    remaining.hrs = (Math.floor((remaining.raw % 86400) / 3600)).toString();
    remaining.days = (Math.floor(remaining.raw / 86400)).toString(); 
    if (remaining.secs.length < 2) {remaining.secs = "0"+remaining.secs;}
    if (remaining.mins.length < 2) {remaining.mins = "0"+remaining.mins;}
    if (remaining.hrs.length < 2) {remaining.hrs = "0"+remaining.hrs;}
    if (remaining.days.length < 3) {if (remaining.days.length < 2) {remaining.days = "00"+remaining.days;} else {remaining.days = "0"+remaining.days;}}
    let resultStr = remaining.days+":"+remaining.hrs+":"+remaining.mins+":"+remaining.secs;
    msg.channel.sendMessage(resultStr);
}