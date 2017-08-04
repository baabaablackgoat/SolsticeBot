const Discord = require("discord.js");
const idToUser = require("./../modules/idtouser");
const randInt = require("./../modules/randomInt");
const fs = require("fs");
module.exports = function(bot,msg,args,options){
    if (bot._spyfall.hasOwnProperty(msg.channel.id)){
        msg.channel.send(`There already is a game running in this channel! Please wait until it has finished.`);return;
    }
    else {
        let locationlists;
        fs.readdir("./data/spyfall","utf-8",(err,files)=>{
            if (err) {console.log(err);} else {
                locationlists = files.map(filename=>filename.substr(0,filename.length-3));
            }
        });
        msg.channel.send(`Initiating Spyfall game...`).then(spy_msg=>{
            spy_msg.edit(`**Spyfall (by Aleksandr Ushan)**\nGame ID: ${spy_msg.id}\nClick on the reaction to join the game. Game will start with 8 players or in 60 seconds.`);
            spy_msg.react("🕵");
            let collector = new Discord.ReactionCollector(spy_msg, (inp)=>{return true;},{time:3000});
            collector.on("collect",(el,col)=>{
                if (el._emoji.name !== "🕵"){
                    el.remove(Array.from(el.users.keys())[0]).catch(err=>console.log(err));
                } 
            });
            collector.on("end",(data,col)=>{
                let players = data.get("🕵").users;
                players.delete(bot.user.id);
                /*if (players.size <= 2) {
                    spy_msg.edit(`**Spyfall (by Aleksandr Ushan)**\nGame ID: ${spy_msg.id}\nThe game was aborted. Not enough players have joined - at least 3 are needed.`);
                }*/
                let playerids = players.keyArray();
                let locations;
                if (locationlists.includes(args[0] && args[0].toLowerCase())){
                    locations = require(`./../data/spyfall/${args[0].toLowerCase()}`);
                } else {
                    locations = require(`./../data/spyfall/classic`);
                }
                console.log(locations);
                let gamedata = {
                    location: undefined, //do something to set the location
                    spy: playerids[randInt(0,playerids.length-1)], //selects a random user
                    players: {}, // userid : role
                    time: new Date().getTime()+600000, //set a time 10mn in the future as limit
                };
                for (let i=0;i<playerids.length;i++){
                    players.get(playerids[i]).createDM().then(dmchannel=>dmchannel.send(`Whoops, not done yet. At least DMs work.`)).catch(err=>console.log(err));
                }
            });
        });
    }
};