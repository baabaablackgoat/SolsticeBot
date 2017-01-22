const Discord = require("discord.js");
module.exports = function (bot, msg, args, options) {
    let reply = {
        id: msg.author.id,
        createdAt: msg.author.createdAt,
        avatarURL: msg.author.avatarURL,
        highestRole: msg.author.highestRole,
        username: msg.author.username,
        discriminator: msg.author.discriminator,
    };
    let mentions = msg.mentions.users.array();
    mentions.map(function(mention){
         reply.id = mention.id;
         reply.createdAt = mention.createdAt;
         reply.avatarURL = mention.avatarURL;
         reply.highestRole = mention.highestRole;
         reply.username = mention.username;
         reply.discriminator = mention.discriminator;
    });




    let richEmbed = new Discord.RichEmbed();
    richEmbed.addField("User ID", reply.id);
    richEmbed.addField("Account age", Math.floor(((new Date() - reply.createdAt) / 86400000)) + " days ago" + " | " + reply.createdAt);
    richEmbed.addField("Avatar", reply.avatarURL);
    richEmbed.setColor(msg.member.highestRole.color);
    richEmbed.setImage(reply.avatarURL);
    richEmbed.timestamp = new Date();
    richEmbed.setAuthor("Solstice User Info | " + reply.username + "#" + reply.discriminator, bot.user.avatarURL);
    msg.channel.sendEmbed(richEmbed);
};