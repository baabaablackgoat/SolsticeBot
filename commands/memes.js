module.exports = function (bot,msg,args,options) {
    const memepages = [
        "https://www.reddit.com/r/kreiswichs/",
        "https://www.reddit.com/r/nottheonion/",
        "https://www.reddit.com/r/showerthoughts/",
        "https://www.reddit.com/r/GlobalOffensive/",
        "https://www.reddit.com/r/Overwatch/",
        "https://www.reddit.com/r/iamverysmart/",
        "https://www.youtube.com/watch?v=yXXyfeWJz1M"
    ];
    msg.channel.sendMessage(memepages[Math.floor(Math.random() * memepages.length)] + " ( ͡° ͜ʖ ͡°)");
};