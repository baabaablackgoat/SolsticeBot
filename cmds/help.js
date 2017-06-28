module.exports = function(bot,msg,args,options){
    const commands = require("./../commands.js");
    const commandKeys = Object.keys(commands);
    if (args.length < 1) {
        let response = "";
        for (let i=0;i<commandKeys.length;i++){
            response += ``;
        }
    } else {

    }
};