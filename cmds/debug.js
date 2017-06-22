module.exports = function(bot,msg,args,options) {
    let temp;
    bot.channels.find(args).join().then((connection)=>{
        temp = connection;
        temp.disconnect();
    })
};