const fs = require("fs");
module.exports = function(bot,msg,args,options) {
    fs.writeFileSync("./data/reminders.json",JSON.stringify(bot._reminders),(err)=>{
        if (err) {console.log(`Failed to save reminders to file: ${err}`);} 
    });
    msg.channel.send(`See you in my next run.\n*glass shattering noises*`).then(msg=>{
        process.exit();
    });
};