const Discord = require("discord.js");
module.exports = function(bot,msg,args,options){
    if (bot._spyfall.hasOwnProperty(msg.channel.id)){
        msg.channel.send(`There already is a game running in this channel! Please wait until it has finished.`);return;
    }
    else {
        msg.channel.send(`Initiating Spyfall game...`).then(spy_msg=>{
            spy_msg.edit(`**Spyfall (by Aleksandr Ushan)**\nGame ID: ${spy_msg.id}\nClick on the reaction to join the game. Game will start with 8 players or in 60 seconds.`);
            spy_msg.react("🕵");
            let collector = new Discord.ReactionCollector(spy_msg, (inp)=>{return true;},{time:60000});
            collector.on("collect",(el,col)=>{
                if (el._emoji.name !== "🕵"){
                    el.remove()
                }
            });
            collector.on("end",(el,col)=>{
                //
            });
        });
    }
}