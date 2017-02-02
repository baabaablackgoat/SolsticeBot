#Solstice Bot
Mostly a test bot, but feel free to use it =P

##Important!
###First:
You need a few npm packages for the bot to work, else it will crash on startup.
There is a packages.json present, just run `npm install` in the folder where your bot instance is in. A new folder called node_modules should show up.

###Second:
It is not unlikely that the bot will lag out while streaming from youtube - especially when you're having another up or downstream running.
This can be fixed by increasing the buffer.

Navigate to \node_modules\ytdl-core\lib\index.js. 

In line 15, pass `{'highWaterMark': 2097152}` to the PassThrough.

`var stream = new PassThrough({'highWaterMark': 2097152});`

###Third:
If you don't have FFMPEG installed and added to PATH, the bot will crash upon attempting to play any audio.
And for some goddamn reason, FFMPEG likes to act up. You can either install and add it manually, *or* if you're on Windows,
then you can use [Chocolatey.](https://chocolatey.org/install)

(Reminder: Chocolatey is installed via PowerShell, and only works if Get-ExecutionPolicy is *not* set to restricted.)

`choco install ffmpeg` should do the trick.

###Fourth:
When forking/downloading this repo, you are missing a file called settings.js.

This file has been excluded/gitignored because it contains your bot token. Soopr sekrit. Donut steel.

You can use settings.default.js to make your own from a template, or copy this block down below. (Updated 2017-02-02)

```js
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
        "178640889285967872": 3, 
        "267809120059392000": 5, 
        "195240975595995138": 2, 
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
        role: "role_id_here", 
        //false or "false" will not remove roles from target. "whitelist" removes all roles that are defined in role_list, "blacklist" removes all roles but the ones in role_list.
        strip_roles: false,
        //Used in conjunction with strip_roles, see comment above.
        role_list: []
    }
};
```
