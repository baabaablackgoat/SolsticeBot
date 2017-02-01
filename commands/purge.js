const getIDfromMention = require("./../methods/getIDfromMention");
const mentionRegex = /<@!*[0-9]+>/g;

module.exports = function (bot, msg, args, options) {
    //Purge has a set syntax. Mentions or keywords that shall be purged are declared before the amount of messages to scan.
    //If a number is detected, the command stops evaluating, and executes.
    //To do: detect if a number was "escaped" by putting it into quotes. (Allow purging messages based on the content, in case they have a number.)

    let argsPos = 0;
    let mentions = getIDfromMention(msg);
    let keywords = [];
    let purgeBots = false;
    let purgeEmbeds = false;

    if (args.length === 0) { //check if any arguments were provided
        msg.channel.sendMessage("You asked me to purge messages, but you provided no arguments.");
        return;
    }
    while (argsPos < args.length) { //Loop over all objects in the arguments - or get kicked out if a number is detected.

        if (!isNaN(Number(args[argsPos]))) { // Number detected, bail!
            msg.channel.sendMessage("Everybody walk the dinosaur");
            return; //Replace this with calling the bulk delete function

        } else if (args[argsPos] === "bot" || args[argsPos] === "bots") {
            purgeBots = true;
        } else if (args[argsPos] === "embed" || args[argsPos] === "embeds") {
            purgeEmbeds = true;
        } else {
            const testForMention=mentionRegex.test(args[argsPos]);

            if (testForMention) {
                console.log("Found a mention, escaping it.");
            } else {
                console.log("EEEEVIL");
            }
        }
        argsPos++;
    }
    msg.channel.sendMessage("Purge isn't ready yet. Debug information:");
    msg.channel.sendCode("fix", " mentions:" + mentions + "\n keywords:" + keywords + "\n bools:" + purgeBots + purgeEmbeds);
    //As soon as it's done, execute the bulk delete.
}