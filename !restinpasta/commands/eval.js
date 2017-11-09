module.exports = function(bot,msg,args,options) {
    try {
        msg.channel.sendCode("fix",eval(args.join(" ")));
    }
    catch(err) {
        msg.channel.sendCode("fix","-ERROR-\n"+err);
    }  
};