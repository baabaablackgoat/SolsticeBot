module.exports = {
    "hots": {
        aliases: ["heroesofthestorm","hots","heroes"], //Array of strings that are associated with this role
        role: "314948731671937024", //the role id that is associated with the giveme
        requires: {
            role: false, //false: no role required, otherwise an array of role IDs that are permitted
            time: false, //false: can get instantly, otherwise the time as a string (see methods/parseduration) the user has to be member already
        },
        options: {
            revokable: true, //User can re-use the command to remove the role from themselves
        }
    },
    "overwatch": {
        
    },
    "csgo": {

    }
};