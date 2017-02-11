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
    //The following object is used to define roleban stuff.
    roleban : {
        //Set to false if you do not wish to use this feature. 
        enabled: true, 
        //Enter the ID of the rolebanned role.
        role: "267801226647699457", 
        //false or "false" will not remove roles from target. "whitelist" removes all roles that are defined in role_list, "blacklist" removes all roles but the ones in role_list.
        strip_roles: false,
        //Used in conjunction with strip_roles, see comment above.
        role_list: []
    },
    //The following is used to setup the mod log.
    modlog : {
        enabled: true,
        channel_id: "199631735711989760",
        server: {
            guildUpdate: true,
            channelCreate : true,
            channelDelete: true,
            channelUpdate: true,
        },
        members: {
            join: true,
            leave: true,
            ban: true,
            nick: true,
            username: true,
            roles: true,
        },
        messages: {
            edit: {
                enabled: true,
                old_content: true,
                new_content: true
            },
            delete: true,
            purge: true,
        },
        bot: {
            commands: true,
        }
    }
};