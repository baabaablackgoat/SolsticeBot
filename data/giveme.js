module.exports = {
    csgo: {
        aliases: ["csgo","cs:go","counterstrike"],
        mode: "toggle", //toggle, remove_only, give_only
        requires: { //you need this if you want it
            roles: false,
            require_all_roles: false,
            time: false,
        },
        bannedroles: false,
        id: "314535359373377537",
    },
    ow: {
        aliases: ["ow","overwatch","owowatch"],
        mode: "toggle",
        requires: {
            roles: false, 
            require_all_roles: false, //Only set this to true if you require roles!
            time: false,
        },
        bannedroles: false,
        id: "314535235494739969",
    },
    hots: {
        aliases: ["hots","heroes","blizzlol"],
        mode: "toggle",
        requires: {
            roles: false,
            require_all_roles: false,
            time: false,
        },
        bannedroles: false,
        id: "314535130960232449",
    }
};

/*
<@&314535359373377537> cs
<@&314535235494739969> ow
<@&314535130960232449> hots
*/