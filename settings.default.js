module.exports= {
    //After you created a bot user, enter your secret token here.
    token: "nope",
    //Get your User ID (Hint: Discord Developer Mode) and put it here.
    owner_id: "178470784984023040",
    //Set the prefix/invoker the bot listens to.
    prefixes: ["beta ", "<!@267407565384581121>","<@267407565384581121>"],
    //Set the "game" the bot is playing by default.
    default_game: "WE'RE DOING IT LIVE!",
    //Player settings.
    player: {
        defaultChannel: false, //Channel ID - if none, set to false
        lockedChannel: false, //Boolean: Is the bot locked to this channel id?
        autoplaylist: true, 
    }






    /* 
        ####################################################################################################################
        THE FOLLOWING SETTINGS HAVE BEEN CARRIED OVER JUST AS A SMALL REMINDER ON WHAT I ALREADY HAD. THEY WILL BE REPLACED.
        ####################################################################################################################

    access_roles: {
        "178640889285967872": 3, // Royal Family
        "267809120059392000": 5, // Bot 🔑 role
        "195240975595995138": 2, // Snowdin
    },
    //If no ban time is specified, bot-ban a user for this time. s = seconds, m = minutes, h = hours, d = days, "never" = permanent
    default_bantime: "3d",
    //If no mute time is specified, mute a user for this time. Same formatting as bantime.
    default_mutetime: "30m",
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
    modlog : {
        enabled: true,
        channel_id: "284751136013942795",
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
            roles: false,
        },
        messages: {
            edit: {
                enabled: true,
                old_content: true,
                new_content: true,
                typo: {
                    check: true,
                    length: 3,
                    meme_mode: true,
                }
            },
            delete: true,
            purge: true,
            timebased: {
                enabled: true,
                mintime: 1,
                maxtime: 10,
            }
        },
        bot: {
            commands: false,
            invalid: true,
        }
    }

    */
};


