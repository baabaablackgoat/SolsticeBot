//=> (X) either a date.parse()able date or a string of up to three
//(X) => object consisting of 4 numerical values and the date it would target. Returns false if invalid.
module.exports = function (input,mode) {
    let now = new Date();
    let abort = false;
    let result = {
        days: 0,
        hrs: 0,
        mins: 0,
        secs: 0,
        target: false,
    };


    //Check if date is parseable.
    if (!isNaN(new Date(input))) { //This obviously ignores the mode.
        result.target = new Date(input);
        let diff = result.target.getTime()-now.getTime();
        result.days = Math.floor(diff/86400000);
        result.hrs = Math.floor((diff%86400000)/3600000);
        result.mins = Math.floor((diff%3600000)/60000);
        result.secs = Math.floor((diff%60000)/1000);
    } else { //Date is not parseable, try splitting it up.
        let raw = input.split(":").map(i=>Number(i));
        raw.forEach(item=>{
            if (isNaN(item)) {
                abort = true;
                return;
            }
        });
        if (abort) {
            return false;
        }
        console.log("valid duration");
        if (mode === "dmh") { //raw is one of the following: 3 days | 3 days,3 hours | 3 days,3 hours,3 minutes 
            let temp = raw[0]*86400000;
            result.days = raw[0];
            if (raw[1]) {
                result.hrs = raw[1];
                temp += raw[1]*3600000;
            }
            if (raw[2]) {
                result.mins = raw[2];
                temp += raw[2]*60000;
            } 
            result.target = new Date(now.getTime()+temp);
        } else if (mode === "hms"){ //raw is one of the following: 3 hrs | 3 hrs,3 mins | 3 hrs,3 mins,3 secs
            let temp = raw[0]*3600000;
            result.days = raw[0];
            if (raw[1]) {
                result.hrs = raw[1];
                temp += raw[1]*60000;
            }
            if (raw[2]) {
                result.mins = raw[2];
                temp += raw[2]*1000;
            } 
            result.target = new Date(now.getTime()+temp);
        }
    }
    return result;
};