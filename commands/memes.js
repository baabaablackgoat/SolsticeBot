module.exports = function (bot,msg,args,options) {
    const memelist = require("./../data/memelist");
    let selectedmeme = "defaultmemes";
    if (memelist.wan1.prefixes.indexOf(args[0])>=0) {
        selectedmeme = "wan1";
    } else if (memelist.maimais.prefixes.indexOf(args[0])>=0) {
        selectedmeme = "maimais";
    }
    msg.channel.sendMessage(memelist[selectedmeme].values[Math.floor(Math.random() * memelist[selectedmeme].values.length)] + " ( ͡° ͜ʖ ͡°)");
};