const getIDfromMention = require("./../methods/getIDfromMention");
const mentionRegex = /<@!*[0-9]+>/;

module.exports = function (bot, msg, args, options) {
    let mentions = getIDfromMention(msg);
    let keywords = [];
    let purgeBots = false;
    let purgeEmbeds = false;
    let lastArg = Number(args[args.length - 1]);
    let purgeAmount;

    if (!args.length) { //check if any arguments were provided
        msg.channel.sendMessage("You asked me to purge messages, but you provided no arguments.");
        return;
    }

    if (!isNaN(lastArg)) {
        args.pop();
        purgeAmount = lastArg;
    } else {
        purgeAmount = 100; //By default, scans the past 100 messages.
    }
    args.forEach(arg => {
        if (arg === "bot" || arg === "bots") {
            purgeBots = true;
        } else if (arg === "embed" || arg === "embeds") {
            purgeEmbeds = true;
        } else {
            const testForMention = mentionRegex.test(arg);

            if (!testForMention) {
                keywords.push(arg);
            } 
        }
    });
    let purge_settings = {
        bots: purgeBots,
        embeds: purgeEmbeds,
        amount: purgeAmount
    };
    const runPurge = function(bot,msg,args,keywords,mentions,purge_settings){
        if (keywords.length === 0 && mentions.length === 0 && !purge_settings.bots && !purge_settings.embeds) { //No keywords, no mentions, no specified purge types? Time for annihilation!
            if (purge_settings.amount < 1) {msg.channel.sendMessage("There was an attempt https://media.giphy.com/media/7rj2ZgttvgomY/giphy.gif"); return;} //unless someone's trolling and requests to delete 0 messages.
            console.log("Deleting the last "+purge_settings.amount+" messages in "+msg.channel.name);
            if (purge_settings.amount === 1) { //This check is only here because bulk delete only supports 2 - 100 messages at once.
                msg.delete()
                    .then(msg.channel.sendCode("fix","- Deleted the purge invocation. Proud of you, ethan. Keep it up.").then(response => response.delete(3000)));
            } else {
                msg.channel.bulkDelete(purge_settings.amount) 
                    .then(deleted => msg.channel.sendCode("fix","- Removed "+deleted.size+" messages")
                        .then(response => response.delete(3000))
                    ).catch(console.error);
            }
        } else {
            msg.channel.fetchMessages({limit: purge_settings.amount})
            .then(function(messages){
                messages = messages.array(); 
                let removelist = []; 
                for (let i=0;i<messages.length;i++) { //Message sent by bot, Bot purge enabled?
                    let keywordIndex = -1;
                    for (let j=0;j<keywords.length;j++) {
                        let temp = messages[i].content.indexOf(keywords[j]);
                        if (temp > keywordIndex) { keywordIndex = temp; }
                    }
                    if (keywordIndex > -1) {
                        removelist.push(messages[i]);
                    }
                    if (mentions.indexOf(messages[i].author.id) > -1) {
                        removelist.push(messages[i]);
                    }
                    if (purge_settings.bots && messages[i].author.bot) {
                        removelist.push(messages[i]);
                    }
                }
                if (removelist.length > 1) {
                    console.log("Deleting "+removelist.length+" messages in "+msg.channel.name);
                    msg.channel.bulkDelete(removelist)
                        .then(deleted => msg.channel.sendCode("fix","- Removed "+deleted.size+" messages")
                            .then(response => response.delete(3000))
                        ).catch(console.error);
                 } else if (removelist.length === 1) {
                     removelist[0].delete().then(deleted => msg.channel.sendCode("fix","- Removed 1 message")
                            .then(response => response.delete(3000))
                        ).catch(console.error);
                 } 
                else {
                    msg.channel.sendCode("fix","No messages matched your query.").then(response => response.delete(3000));
                }
                console.log(removelist.length);
            })
            .catch(console.error);
        }
    };

    runPurge(bot,msg,args,keywords,mentions,purge_settings);
};