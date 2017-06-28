module.exports = function(bot,msg,args,options) {
    if (args.length>=1) {
        msg.channel.send(`${args[0].toLowerCase()},${args[0].toLowerCase() === "hidden"},${typeof args[0].toLowerCase()}`);
    } else {
        msg.channel.send(":japanese_goblin:");
    }
};