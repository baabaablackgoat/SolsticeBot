module.exports = function (bot,msg,args,options) {
    let reply = new Discord.RichEmbed();
    console.log(msg.member);
    reply.addField("User ID", msg.author.id);
    reply.addField("Account age", Math.floor(((new Date() - msg.author.createdAt) / 86400000)) + " days ago" + " | " + msg.author.createdAt);
    reply.addField("Avatar", msg.author.avatarURL);
    reply.setColor(msg.member.highestRole.color);
    reply.setImage(msg.author.avatarURL);
    reply.timestamp = new Date();
    reply.setAuthor("Solstice User Info | " + msg.author.username + "#" + msg.author.discriminator, bot.user.avatarURL);
    msg.channel.sendEmbed(reply);
};