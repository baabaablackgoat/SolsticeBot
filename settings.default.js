module.exports= {
    //After you created a bot user, enter your secret token here.
    token: "yourbottokenhere",
    //Get your User ID (Hint: Discord Developer Mode) and put it here.
    owner_id: "youruserid",
    //Set the prefix/invoker the bot listens to.
    prefix: "!",
    //Set the "game" the bot is playing by default.
    default_game: "with unhandled promises",
    //Use this object to assign access values to any role. ("Role id":access) NYI
    access_roles: {
        "178640889285967872": 3, // Royal Family
        "267809120059392000": 5, // Bot 🔑 role
        "195240975595995138": 2, // Snowdin
    },
    //If no ban time is specified, bot-ban a user for this time. s = seconds, m = minutes, h = hours, d = days, "never" = permanent
    default_bantime: "3d",
    //Anyone in userlist.json with an access value of this or higher is immune to the botban.
    ban_immunity: 5,
    //Use this object to define the Roleban role, in case you wish to use this feature.
    rolebanned_role: "267801226647699457"
};