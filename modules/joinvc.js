module.exports = function (bot, targetChannel) {
    return new Promise((resolve, reject) => {
        if (!bot._player.connection || bot._player.connection.channel.id !== targetChannel) {
            console.log(`attempting to connect`);
            return bot.channels
                .get(targetChannel)
                .join()
                .then((connection) => {
                    bot._player.connection = connection;
                    console.log(`connected`);
                    resolve(`:ok_hand:`);
                })
                .catch(err => reject(console.log(err)));
        } else {
            console.log(`still connected to correct channel`);
            return resolve(`Connection to ${bot._player.connection.channel.name} still valid`);
        }
    });
};