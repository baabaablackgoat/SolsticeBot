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
            let msgstart = `**Spyfall** (by Aleksandr Ushan)\nGame ID: \`${spy_msg.id}\`\n\n`;
            spy_msg.edit(`${msgstart}Click on the reaction to join the game. Game will start in 60 seconds.`);
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
                /*if (players.size < 3) {
                    spy_msg.edit(`**Spyfall (by Aleksandr Ushan)**\nGame ID: ${spy_msg.id}\nThe game was aborted. Not enough players have joined - at least 3 are needed.`);
                }*/
                let playerids = players.keyArray();
                let locations;
                if (locationlists.includes(args[0] && args[0].toLowerCase())){
                    locations = require(`./../data/spyfall/${args[0].toLowerCase()}`);
                } else {
                    locations = require(`./../data/spyfall/classic`);
                }
                let gamedata = {
                    location: locations[Object.keys(locations)[randInt(0,Object.keys(locations).length-1)]], //do something to set the location
                    spy: playerids[randInt(0,playerids.length-1)], //selects a random user
                    players: {}, // userid : role
                    time: new Date().getTime()+600000, //set a time 10mn in the future as limit
                    erroredplayers: {}, //Players that weren't sent a DM will be logged here. If the spy had DMs disabled, the game is terminated. If not enough players remain, the game is terminated.
                };
                for (let i=0;i<playerids.length;i++){
                    //Check if error code 50007 occurs. If it happens, their DMs are disabled.
                    if (playerids[i] === gamedata.spy){ //Current player is the spy!
                        players.get(playerids[i]).createDM().then(dmchannel=>dmchannel.send(`${msgstart}**You are the spy!**\nYour mission: Find out which location your "friends" are currently at. Do not let them find out that you're the Spy.\n\n**Location list:**\n${Object.keys(locations).join("\n")}`))
                            .catch(err=>{
                                if (err.hasOwnProperty("code")){
                                    gamedata.erroredplayers[players.get(playerids[i]).id] = err.code;
                                    console.log(`Couldn't send DM to ${players.get(playerids[i]).tag}, DiscordAPIError Code ${err.code}`);
                                }
                                else {
                                    gamedata.erroredplayers[players.get(playerids[i]).id] = false;
                                    console.log(`An unknown error occured while DMing ${players.get(playerids[i]).tag}:\n${err}`);
                                }
                            });
                    } else {
                        let role = gamedata.location[randInt(0,gamedata.location.length-2)];
                        if (Object.values(gamedata.players).includes(role)){role = gamedata.location[gamedata.location.length-1];} //If the role was already distributed to someone else, give them the default (last) role.
                        gamedata.players[playerids[i]] = role;
                        players.get(playerids[i]).createDM().then(dmchannel=>dmchannel.send(`${msgstart}**You are NOT the spy.**\nYour role: ${role}\nYour mission: One of your fellow friends is a spy. Luckily, they have no idea where they're at. Figure out who the spy is before he knows where you're at, and get all your teammates to vote them out as a spy.\n\n**Location list:**\n${Object.keys(locations).join("\n")}`))
                            .catch(err=>{
                                if (err.hasOwnProperty("code")){
                                    gamedata.erroredplayers[players.get(playerids[i]).id] = err.code;
                                    console.log(`Couldn't send DM to ${players.get(playerids[i]).tag}, DiscordAPIError Code ${err.code}`);
                                }
                                else {
                                    gamedata.erroredplayers[players.get(playerids[i]).id] = false;
                                    console.log(`An unknown error occured while DMing ${players.get(playerids[i]).tag}:\n${err}`);
                                }
                        });
                    }
                }
                //Did the spy not recieve a DM? Are not enough players (3) left to start? If either is true, abort the game.
                if (Object.keys(gamedata.erroredplayers).includes(gamedata.spy)){
                    if (gamedata.erroredplayers[gamedata.spy]===50007){
                        spy_msg.edit(`${msgstart}Whoops! ${players.get(gamedata.spy)} was selected as the spy, but their DMs are disabled! SHAME! :bell: :bell: Game aborted.`);
                    } else {
                        spy_msg.edit(`${msgstart}Whoops! ${players.get(gamedata.spy)} was selected as the spy, but something went wrong... Sorry. Game aborted.`);
                    }
                    return;
                }
                let failedtags = [];
                for (let i=0;i<Object.keys(gamedata.erroredplayers);i++){
                    failedtags.push(players.get(Object.keys(gamedata.erroredplayers)[i]).tag);
                }
                if (Object.keys(gamedata.players).length < 3){
                    spy_msg.edit(`${msgstart}Whoops! I couldn't DM enough players for the game to start...\nPlease check if you have DMs from server members disabled. (Server Privacy settings)\n\nThese players did not recieve a DM:\n${failedtags.join(", ")}`);
                }
                spy_msg.edit(`${msgstart}Game has started.`);
            });
        });
    }
};