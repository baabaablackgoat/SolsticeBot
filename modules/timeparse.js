module.exports = function (timestring) {
    //converts the entered timestring into ms
    let multiplier = 0;
    let amt = Number(timestring.substr(0,timestring.length-2));
    if (isNaN(amt)){
        console.log(`timeparse encountered an error: amount does not resolve to a number`);
        return false;
    }
    switch (timestring.toLowerCase().substr(timestring.length-2,timestring.length-1)) {
        case "d":
            multiplier = 86400000;
            break;
        case "h":
            multiplier = 3600000;
            break;
        case "m":
            multiplier = 60000;
            break;
        case "s":
            multiplier = 1000;
            break;
        default:
            console.log(`timeparse encountered an error: Invalid parameter ${timestring.toLowerCase().substr(timestring.length-2,timestring.length-1)}`);
            break;
    }
    return amt*multiplier;
    
};