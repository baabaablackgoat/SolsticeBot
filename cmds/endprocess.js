module.exports = function(bot,msg,args,options) {
    msg.channel.send(`See you in my next run.\n*glass shattering noises*`).then(msg=>{
        process.exit();
    });
};