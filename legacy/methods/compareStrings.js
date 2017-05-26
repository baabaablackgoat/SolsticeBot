const lev = require("levenshtein-string-distance");
const smallestDist = function(arr){
    let result = [];
    let currentMin = 100; //There's probably no command longer than 100 chars, right?
    for (let j=0;j<arr.length;j++) {
        if (arr[j]<currentMin) {
            currentMin = arr[j];
            result = [j]; //reset the array and put in the command index
        } else if (arr[j]===currentMin) { 
            result.push(j); //Multiple commands have the same string distance, push the index to the result array.
        }
    }
    return result;
};

module.exports = function(str, arr) {
    let str_dist = [];
    let result = [];
    for (let i=0;i<arr.length;i++) {
        str_dist.push(lev(str,arr[i]));
    }
    let indexes = smallestDist(str_dist);
    for (let i=0;i<indexes.length;i++) {
        result.push(arr[indexes[i]]);
    }
    console.log(result);
    return result;
};