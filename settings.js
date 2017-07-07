module.exports = {
    //Set the prefixes/invokers the bot listens to.
    prefixes: ["alpha ", "<@!327930755609001984>","<@327930755609001984>","canary ","="],
    //Set the "game" the bot is playing by default.
    default_game: "WE'RE DOING IT LIVE!",
    //Player settings.
    player: {
        defaultChannel: "206511217752145922", //Channel ID - if none, set to false
        lockedChannel: false, //Boolean: Is the bot locked to this channel id?
        autoplaylist: false,
        defaultvolume: 0.5,
        skip_rate: 0.5,
    },
    //After you created a bot user, enter your secret token here. You can either provide the string directly, or you create an environment variable like I did.
    //(Thanks for the idea, Felix!)
    token: process.env.BotToken_Solstice_Canary,
};