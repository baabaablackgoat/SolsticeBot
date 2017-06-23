const fs = require("fs");
module.exports = function(bot,msg,args,options) {
    fs.readFile("./data/test.txt",'utf8',(err,data)=>{
        if (!err) {
            const result = data.includes("\r\n") ? data.split("\r\n") : data.split("\n");
            console.log(result);
        } else {
            console.log(err);
        }
    });
    
};