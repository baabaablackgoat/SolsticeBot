const joinVC = require("./../modules/joinvc");
module.exports = function(bot,msg,args,options) {
    let joinPromise = joinVC(bot,args[0]);
    joinPromise.then(response=>{
        msg.channel.send(`Promise resolved: ${response}`);
    }).catch(err=>{
        msg.channel.send(`joinPromise was caught: ${err}`);
    });
};