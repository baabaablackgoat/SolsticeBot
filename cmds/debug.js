const ytsearch = require("youtube-search");
const abortSearch = function(msg) {
    msg.channel.send("Oh well...");
    return;
};
module.exports = function(bot,msg,args,options) {
    msg.channel.send(":ok_hand:");
    ytsearch(args[0],{maxResults:3, key: "AIzaSyAz_BDYZyp3iQdObVcSHXzQ4ma7Wz-42vw"},(err,data)=>{
        if (!err) {
            for (let i=0;i<data.length;i++){
            }
        } else {
            console.log(`Error: ${err}`);
        }
    });
};