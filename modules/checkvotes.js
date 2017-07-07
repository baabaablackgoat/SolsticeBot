//if value is undefined, returns an object of all available vote values and their respective count
//if value was defined, returns the number of cast votes for this value
module.exports = function(bot,vote,value = false){ 
    if (!bot._votes.hasOwnProperty(vote)){console.log(`Attempted to read votes of ${vote} but this does not exist`); return false;}
    if (!value){
        let results = {};
        for (let key in bot._votes[vote]) {
            if (!bot._votes[vote].hasOwnProperty(key)) {continue;} //If the key's from the prototype, skip this iteration https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
            if (results.hasOwnProperty([bot._votes[vote][key]])) {results[bot._votes[vote][key]] = 0;}
            results[bot._votes[vote][key]]++;
        }
        return results;
    } else { //yes i know I don't need this else but i like it this way okay
        let result = 0;
        for (let key in bot._votes[vote]){
            if (!bot._votes[vote].hasOwnProperty(key)) {continue;}
            if (bot._votes[vote][key] === value) {
                result++;
            }
        }
        return result;
    }
};