const randInt = require("./../modules/randomInt");
module.exports = function(bot,msg,args,options){
    msg.channel.send({files:[{attachment:`./data/fantastico/${randInt(0,2)}.png`,name:"FANTASTICO.png"}]});
};