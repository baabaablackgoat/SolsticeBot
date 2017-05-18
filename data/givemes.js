module.exports = {
    "hots": {
        alias: ["heroesofthestorm","hots","heroes"], //Array of strings that are associated with this role
        role: "314539851359846404", //the role id that is associated with the giveme
        requires: {
            role: false, //false: no role required, otherwise the role ID required for the giveme
            time: false, //false: can get instantly, otherwise the time as a string (see methods/parseduration) the user has to be member already
        },
        options: {
            revokable: false, //User can re-use the command to remove the role from themselves
        }
    },
    "overwatch": {
        
    },
    "csgo": {

    }
};