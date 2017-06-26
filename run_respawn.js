const npm_respawn = require("respawn");
let respawn = npm_respawn(["node","index.js"],{
    name: "solstice",
    maxRestarts: 5,
    sleep:2000,
    kill:30000,
    stdout: process.stdout,
    }
);
respawn.start();

respawn.on("exit",()=>{
    respawn.start();
});
respawn.on("crash",()=>{
    console.log(`respawn monitor has crashed!`);
});