const getUserID = require("./../modules/getuserid");
const IDtoUser = require("./../modules/idtouser");
module.exports = function(bot,msg,args,options){
    if (bot._player.queue.length < 1) {
        msg.channel.send(`The music queue is empty.`);
        return;
    }
    let user_filter = getUserID(bot,args[0],msg.guild.id);
    let response = "";
    for (let i=0;i<bot._player.queue.length;i++){
        if (user_filter === false || user_filter.includes(bot._player.queue[i].author)) {
            let queue_author = IDtoUser(bot,bot._player.queue[i].author,msg.guild.id);
            if (!queue_author) {queue_author.username = "Unknown user"}
            response += `\`${i+1}|\` **${bot._player.queue[i].title}** for ${bot.channels.get(bot._player.queue[i].issuedchannel.voice).name} queued by **${queue_author.username}**\n`;
        }
    }
    if (response.length === 0) { msg.channel.send("I couldn't find any songs queued by this user."); } else { msg.channel.send(response); }
};

/*
{
    title: info.title,
    src: args,
    local: false,
    issuedchannel: {
        text: messageInfo.textChannel,
        voice: issuedVC,
    },
    author: messageInfo.author,
}
*/