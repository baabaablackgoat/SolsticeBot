module.exports = function(bot,msg,args,options) {
    msg.channel.sendCode("fix",eval(args.join(" ")));
};