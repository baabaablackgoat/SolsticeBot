const ytsearch = require("youtube-search");
const addToQueue = require("./../modules/addtoqueue");
const discord = require("discord.js");
const checkResults = function(bot,msg,data,pos,issuedVC) {
    msg.channel.send(`${data[pos].link}\nIs this what you meant? \`y\`,\`n\`, or \`exit\``);
    let listener = new discord.MessageCollector(msg.channel,(data)=>{
        if (data.author.id === msg.author.id && ["y","n","exit"].includes(data.content)) {
            return true;
        } else {
            return false;
        }
    },{maxMatches:1,time:10000});

    listener.on("end",(collection,reason)=>{
        if (reason === "time") {
            console.log(reason);
            msg.channel.send("Search function has timed out - recieved no response.");
            return false;
        } else if (reason !== "matchesLimit") {
            console.log(`MessageCollector exited early: ${reason}`);
            msg.channel.send("Oops, something went wrong! Aborting...");
            return false;
        }
        let keys = Array.from(collection.keys());
        if (collection.get(keys[0]).content === "n") {
            pos++;
            if (pos>=data.length) {
                msg.channel.send(`Reached end of search results, exiting.`);
                return false;
            } else {
                checkResults(bot,msg,data,pos);
            }
        } else if (collection.get(keys[0]).content === "y") {
            addToQueue(bot,msg,data[pos].link,issuedVC);
        } else if (collection.get(keys[0]).content === "exit") {
            msg.channel.send(`Search terminated by user.`);
            return false;
        } else {
            msg.channel.send(`Whoops, something went wrong...`);
            return false;
        }
    });
};


module.exports = function(bot,msg,args,options) {
    if (args.length < 1) {
        msg.channel.send("I need something to look for on YouTube!");
        return;
    }
    args = args.join(" ");
    msg.channel.send(`Looking up ${args}...`);
    ytsearch(args,{maxResults:3, type:"video", key: "AIzaSyAz_BDYZyp3iQdObVcSHXzQ4ma7Wz-42vw"},(err,data)=>{
        if (!err) {
            let pos = 0;
            checkResults(bot,msg,data,pos);
        } else {
            console.log(`Error: ${err}`);
        }
    });
};