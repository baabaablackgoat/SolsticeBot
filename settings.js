module.exports = {
    //Set the prefixes/invokers the bot listens to.
    prefixes: ["beta ", "<!@267407565384581121>","<@267407565384581121>"],
    //Set the "game" the bot is playing by default.
    default_game: "WE'RE DOING IT LIVE!",
    //Player settings.
    player: {
        defaultChannel: false, //Channel ID - if none, set to false
        lockedChannel: false, //Boolean: Is the bot locked to this channel id?
        autoplaylist: true,
        defaultvolume: 0.5 
    },
    //Get your User ID (Hint: Discord Developer Mode) and put it here.
    owner_id: "178470784984023040",
    //After you created a bot user, enter your secret token here. You can either provide the string directly, or you create an environment variable like I did.
    //(Thanks for the idea, Felix!)
    token: process.env.BotToken_Solstice_Beta,
};