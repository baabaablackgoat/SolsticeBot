const randomInt = require("./../methods/randomInt");
module.exports = function(bot,msg,args,options) {
    let rand = randomInt(1,2);
    switch (rand) {
        case 1:
            msg.channel.send(":chicken:\n:necktie:");
            break;
        case 2:
            msg.channel.send("http://vignette4.wikia.nocookie.net/walkingdead/images/0/00/Hen_in_a_tie.jpg/revision/latest/scale-to-width-down/1024?cb=20140430133107");    
            break;
    }
}