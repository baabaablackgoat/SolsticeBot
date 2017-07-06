const getUserID = require("./../modules/getuserid");
module.exports = function(bot,msg,args,options){
    if (bot._player.queue.length < 1) {
        msg.channel.send(`Queue is empty. Nothing to clear.`);
    } else {
        let userfilter = getUserID(args[0]);
        if (!userfilter){
            msg.channel.send(`\`🚮 ${bot._player.queue.length}\``);
            bot._player.queue = [];
        } else {
            let count = 0;
            for (let i=0;i<bot._player.queue.length;i++){
                if (userfilter.includes(bot._player.queue[i].author)){
                    count++;
                    bot._player.queue.splice(i,1);
                }
            }
            msg.channel.send(`\`🚮 ${count}\``);
        }

    }
};