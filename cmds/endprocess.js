module.exports = function(bot,msg,args,options) {
    if (options.settings.bot_admins.includes(msg.author.id)){
        msg.channel.send(`See you in my next run.\n*glass shattering noises*`).then(msg=>{
            process.exit();
        });
    } else {
        msg.channel.send(`*You lift the crowbar...\nIt snaps in two.\nSeems like touching stuff that isn't yours isn't the best idea.`);
    }
};