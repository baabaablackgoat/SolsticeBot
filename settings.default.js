module.exports= {
    //After you created a bot user, enter your secret token here.
    token: "yourbottokenhere",
    //Get your User ID (Hint: Discord Developer Mode) and put it here.
    owner_id: "youruserid",
    //Set the prefix/invoker the bot listens to.
    prefix: "!",
    //Set the "game" the bot is playing by default.
    default_game: "with unhandled promises",
    //Set this to true if you want to create roles on your Server. Set it to false if you want to use userlist.js ("hidden bans") instead.
    useDiscordRoles: false,
    //If useDiscordRoles is true, set this to the ID of the role that is assigned to people who are no longer allowed to use the bot.
    botbanned_role_id: "",
    //If useDiscordRoles is true, set this to the ID of the role that is assigned to people who you trust or are supposed to have higher access.
    access_role_id: ""
}