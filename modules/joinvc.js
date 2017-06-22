module.exports = function (bot, targetChannel) {
    return new Promise((resolve, reject) => {
        if (!bot._player.connection || bot._player.connection.channel.id !== targetChannel) {
            return bot.channels
                .get(targetChannel)
                .join()
                .then((connection) => {
                    bot._player.connection = connection;
                    console.log(bot._player.connection.dispatcher);
                    resolve(`:ok_hand:`);
                })
                .catch(err => reject(console.log(err)));
        } else {
            return resolve(`Connection to ${bot._player.connection.channel.name} still valid`);
        }
    });
};