module.exports = function(bot,msg,args,options) {
    const normalhugs = function() {
        let rand = Math.random();
        if (rand < 0.25) {
            msg.channel.sendMessage("You'll be alright. \n *huggu*");
        } else if (rand < 0.5) {
            msg.channel.sendMessage("Cheer up, bucko. We'll just take over the world on another day. \n *huggu*");
        } else if (rand < 0.75) {
            msg.channel.sendMessage("You know that we'll always be here for you. \n *huggu*");
        } else {
            msg.channel.sendMessage("Stay determined. You always have a cause to continue. \n *huggu*");
        }
    };

    //A few special cases for a few special people.
    switch (msg.author.id) {
        case "120698901236809728":
            msg.channel.sendMessage("*slides right next to wist* wistuuuuuu! \n *huggu*");
            break;
        case "116138050710536192":
            if (msg.member.nickname.toLowerCase === "liz") {
                msg.channel.sendMessage("hi liz! \n *huggu*");
            } else {
                msg.channel.sendMessage("hello cute road \n *huggu*");
            }
            break;
        case "143158243076734986":
             msg.channel.sendMessage("kieeeerke, get out of the trashcan, you huggable \n *huggu*");
             break;
        case "78541183818674176":
             msg.channel.sendMessage("hi squishy \n *huggu*");
             break;   
        case "146545496192843776":
            msg.channel.sendMessage("iceuuuu! \n *huggu*");
            break;
        case "178470784984023040":
            msg.channel.sendMessage("...nah, Niklas. You're not getting any hugs.");
            break;
        case "128985967875850240": 
            msg.channel.sendMessage("Feeeeeliiiix! \n *huggu*");
            break; 
        default:
            normalhugs();
            break;
    }
};