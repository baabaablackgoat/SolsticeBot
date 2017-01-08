#Solstice Bot
Mostly a test bot, but feel free to use it =P

##Important!
You will most likely need to install a few npm packages.
`npm install ytdl-core discord.js opusscript`

Also:
It is highly possible that your bot will crash if you try to play an audio file.
This happens because FFMPEG isnt installed on your computer or isn't added to your path.
For these cases, (and if you're on Windows), I highly suggest you install Chocolatey. (Reminder: Chocolatey is installed via PowerShell, and only works if Get-ExecutionPolicy is *not* set to restricted.)
https://chocolatey.org/install
As soon as it's installed, `choco install ffmpeg` should do the trick.

Your settings.js should look like this:

```js
module.exports= {
    token: "[your bot token]",
    owner_id: "[your user id]",
    prefix: "[your desired prefix]"
}
```

You can use the settings.default.js as a template.
