const getUserID = require("./../modules/getuserid");
const IDtoUser = require("./../modules/idtouser");
const discord = require("discord.js");
module.exports = function(bot,msg,args,options){
    if (!args[0]){
        msg.channel.send(`You didn't tell me who you'd like to ban!`);
        return;
    } 
    let selected_users = getUserID(bot,args[0],msg.guild.id);
    let target;
    if (!selected_users) {
        msg.channel.send(`I couldn't find this user...`);
        return;
    } else if (selected_users.length > 1) {
        let reply = `Enter the number only.\n`;
        for (let i=0;i<selected_users.length;i++){
            let user = IDtoUser(bot,selected_users[i],msg.guild.id);
            reply += `\`${i}|\` ${user.username}#${user.discriminator}\n`;
        }
        msg.channel.send(reply);
        let listener = new discord.MessageCollector(msg.channel,data=>data.author.id===msg.author.id&&Number(data.content)>-1&&Number(data.content)<selected_users.length,{time:10000,maxMatches:1});
        listener.on("end",(collection,reason)=>{
            if (reason==="time") {
                msg.channel.send(`Message collector timed out.`);
                return;
            }
            let keys = Array.from(collection.keys());
            target = IDtoUser(bot,selected_users[collection(keys[0])],msg.guild.id);
        });
    } else {
        target = IDtoUser(bot,selected_users[0],msg.guild.id);
    }
    msg.channel.send(`Selected user ${target.username}#${target.discriminator}. But i didn't implement lé banne yet`);
};