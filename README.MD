#Solstice Bot
Mostly a test bot, but feel free to use it =P

##Important!
###First:
For some reasons, the required npm packages don't always install by themselves.
And yes, I do have a package.json.
Here's the full command you'll need:

`npm install ytdl-core discord.js opusscript`

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

You can use settings.default.js to make your own from a template, or copy this block down below.

```js
module.exports= {
    //After you created a bot user, enter your secret token here.
    token: "yourbottokenhere",
    //Get your User ID (Hint: Discord Developer Mode) and put it here.
    owner_id: "youruserid",
    //Set the prefix/invoker the bot listens to.
    prefix: "yourprefix",
    //Set the "game" the bot is playing by default.
    default_game: "with unhandled promises",
    //Set this to true if you want to create roles on your Server. Set it to false if you want to use userlist.js ("hidden bans") instead.
    useDiscordRoles: true,
    //If useDiscordRoles is true, set this to the ID of the role that is assigned to people who are no longer allowed to use the bot.
    botbanned_role_id: "botbannedroleid", 
    //If useDiscordRoles is true, set this to the ID of the role that is assigned to people who you trust or are supposed to have higher access.
    access_role_id: "trustedroleid" 
}
```
