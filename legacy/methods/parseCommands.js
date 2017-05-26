//Courtesy of @FelixRilling *hug*
"use strict";

module.exports = function (strInput) {
  const result = {
    name: "",
    args: []
  };
  const str = strInput.trim();
  const commandEndPos = str.indexOf(" ");

  //If no parameters are present skip this block
  if (commandEndPos !== -1) {
    const quotes = ["'", "\"", "`"];
    const strArgs = str.substr(commandEndPos).trim();
    let inString = false;
    let partStr = [];

    result.name = str.substr(0, commandEndPos);

    strArgs.split("").forEach(letter => {
      if (quotes.includes(letter)) {
        inString = !inString;
        result.args.push(partStr.join(""));
        partStr = [];
      } else {
        if (letter !== " " || inString) {
          partStr.push(letter);
        } else if (letter === " ") {
          result.args.push(partStr.join(""));
          partStr = [];
        }
      }
    });
    result.args.push(partStr.join(""));
    result.args = result.args.filter(arg => arg.length);
  } else {
    result.name = str;
  }

  return result;
};