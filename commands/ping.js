const Discord = require("discord.js");
module.exports = function (bot, msg, args, options) {
    let embed = new Discord.RichEmbed();
    const uptime = function() {
        let rawtime = Math.floor(bot.uptime/1000);
        let output = "";
        if (Math.floor(rawtime/86400) > 0) {
            output = output + Math.floor(rawtime/86400) + "d ";
        } 
        if (Math.floor((rawtime%86400)/3600) > 0 || output.length > 0) {
            output = output + Math.floor((rawtime%86400)/3600) + "h ";
        }
        if (Math.floor((rawtime%3600)/60) > 0 || output.length > 0) {
            output = output + Math.floor((rawtime%3600)/60) + "m "; 
        }
        output = output + rawtime%60 + "s";
        return output; 
    };
    const lastReady = function() {
        let date = bot.readyAt;
        let output = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" ";
        if (date.getHours().length === 1) {output = output+"0"+date.getHours();} else {output = output+date.getHours();}
        output = output + ":";
        if (date.getMinutes().length === 1) {output = output+"0"+date.getMinutes();} else {output = output+date.getMinutes();}
        output = output + ":";
        if (date.getSeconds().length === 1) {output = output+"0"+date.getSeconds();} else {output = output+date.getSeconds();}
        return output;
    };
    embed.setColor([0,125,255]);
    embed.setTitle("Ping: "+ Math.ceil(bot.ping));
    embed.setDescription("Uptime: "+uptime()+" | "+lastReady());
    msg.channel.sendEmbed(embed);
};