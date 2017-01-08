#Solstice Bot
Mostly a test bot, but feel free to use it =P

##Important!
###First:
You will most likely need to install a few npm packages.
`npm install ytdl-core discord.js opusscript`

###Second:
It is not unlikely that the bot will lag out while streaming from youtube.
This can be fixed by increasing the buffer.

Navigate to \node_modules\ytdl-core\lib\index.js. 

In line 15, pass `{'highWaterMark': 2097152}` to the PassThrough.

`var stream = new PassThrough({'highWaterMark': 2097152});`

###Third:
It is highly possible that your bot will crash if you try to play an audio file.
This happens because FFMPEG isnt installed on your computer or isn't added to your path.

For these cases, (and if you're on Windows), I highly suggest you install [Chocolatey.](https://chocolatey.org/install)

(Reminder: Chocolatey is installed via PowerShell, and only works if Get-ExecutionPolicy is *not* set to restricted.)

As soon as it's installed, `choco install ffmpeg` should do the trick.

###Fourth:
Your settings.js should look something like this:

```js
module.exports= {
    token: "[your bot token]",
    owner_id: "[your user id]",
    prefix: "[your desired prefix]",
    default_game: "[insert a meme here]"
}
```

You can use the settings.default.js as a template.
