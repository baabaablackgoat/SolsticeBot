//Used to show banned people for how long they are banned.
module.exports = function(expires) {
    if (expires === "never") {
        return "three thousand eternities *(permanent)*";
    } else {
        let time = (expires - new Date()) / 1000;
        if (time > 60) { //more than 60 seconds
            time = Math.ceil(time / 60);
            if (time > 60) { //more than 60 minutes
                time = Math.ceil(time / 60);
                if (time > 24) { //more than 24 hours
                    time = Math.ceil(time / 24);
                    return time + " days";
                }
                return time + " hours";
            } else {
                return time + " minutes";
            }
        } else {
            return time + " seconds";
        }
    }
};