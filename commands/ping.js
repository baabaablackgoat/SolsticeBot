const Discord = require("discord.js");
module.exports = function (bot, msg, args, options) {
    let embed = new Discord.RichEmbed();
    let temp = Math.floor(bot.uptime/1000);
    let uptime = Math.floor(temp/86400)+"d"+Math.floor((temp%86400)/3600)+"h"+Math.floor((temp%3600)/60)+"m"+temp%60+"s";
    temp = bot.readyAt;
    let lastReady = temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+temp.getDate()+" "+temp.getHours()+":"+temp.getMinutes()+":"+temp.getSeconds();
    embed.setColor([0,125,255]);
    embed.setTitle("Ping: "+ Math.ceil(bot.ping));
    embed.setDescription("Uptime: "+uptime+" | "+lastReady);
    msg.channel.sendEmbed(embed);
};