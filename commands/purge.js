const getIDfromMention = require("./../methods/getIDfromMention");
const mentionRegex = /<@!*[0-9]+>/;

module.exports = function (bot, msg, args, options) {
    //Purge has a set syntax. Mentions or keywords that shall be purged are declared before the amount of messages to scan.
    //If a number is detected, the command stops evaluating, and executes.
    //To do: detect if a number was "escaped" by putting it into quotes. (Allow purging messages based on the content, in case they have a number.)

    let argsPos = 0;
    let mentions = getIDfromMention(msg);
    let keywords = [];
    let purgeBots = false;
    let purgeEmbeds = false;
    let lastArg = Number(args[args.length - 1]);
    let purgeAmount;

    if (!isNaN(lastArg)) {
        args.pop();
        purgeAmount = lastArg;
    } else {
        purgeAmount = true
    };

    if (!args.length) { //check if any arguments were provided
        msg.channel.sendMessage("You asked me to purge messages, but you provided no arguments.");
        return;
    }
    args.forEach(arg => {
        if (arg === "bot" || arg === "bots") {
            purgeBots = true;
        } else if (arg === "embed" || arg === "embeds") {
            purgeEmbeds = true;
        } else {
            const testForMention = mentionRegex.test(arg);

            if (testForMention) {
                console.log("Found a mention, escaping it.");
            } else {
                console.log("EEEEVIL");
                keywords.push(arg);
            }
        }
    });

    msg.channel.sendMessage("Purge isn't ready yet. Debug information:");
    msg.channel.sendCode("fix", " mentions:" + mentions + "\n keywords:" + keywords + "\n bools:" + purgeBots + purgeEmbeds);
    //As soon as it's done, execute the bulk delete.
}