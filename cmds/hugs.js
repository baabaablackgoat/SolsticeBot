module.exports = function(bot,msg,args,options) {
    const normalhugs = function() {
        let rand = Math.random();
        if (rand < 0.25) {
            msg.channel.send("You'll be alright. \n *huggu*");
        } else if (rand < 0.5) {
            msg.channel.send("Cheer up, bucko. We'll just take over the world on another day. \n *huggu*");
        } else if (rand < 0.75) {
            msg.channel.send("You know that we'll always be here for you. \n *huggu*");
        } else {
            msg.channel.send("Stay determined. You always have a cause to continue. \n *huggu*");
        }
    };

    //A few special cases for a few special people.
    switch (msg.author.id) {
        case "120698901236809728":
            msg.channel.send("*slides right next to wist* wistuuuuuu! \n *huggu*");
            break;
        case "116138050710536192":
            if (msg.member.nickname.toLowerCase === "liz") {
                msg.channel.send("hi liz! \n *huggu*");
            } else {
                msg.channel.send("hello cute road \n *huggu*");
            }
            break;
        case "143158243076734986":
             msg.channel.send("kieeeerke, get out of the trashcan, you huggable \n *huggu*");
             break;
        case "78541183818674176":
             msg.channel.send("hi squishy \n *huggu*");
             break;   
        case "146545496192843776":
            msg.channel.send("iceuuuu! \n *huggu*");
            break;
        case "178470784984023040":
            if (msg.author.presence.status === "dnd") {
                msg.channel.send("...you'll be alright, Niklas. Everything is going to be fine. \n *huggu* \n https://www.youtube.com/watch?v=ntTtFs1_GNM");
            } else {
                msg.channel.send("Greetings, my lord. \n *huggu*");
            }
            break;
        case "128985967875850240": 
            msg.channel.send("Feeeeeliiiix! \n *huggu*");
            break; 
        case "184008067661168640":
            msg.channel.send("ey b0ss, i habe hugs \n *huggu*");
            break;
        default:
            normalhugs();
            break;
    }
};