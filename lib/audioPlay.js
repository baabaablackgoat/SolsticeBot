"use strict";

module.exports = function (bot, msg, fileName) {
  if (!bot._voice.playing) {
    const fileUrl = process.cwd() + "/assets/" + fileName;
    const channelId = msg.member.voiceChannelID;

    bot._voice.channel = msg.guild.channels.get(channelId);

    if (bot._voice.channel) {
      bot._voice.channel.join().then(connection => {
        bot._voice.dispatcher = connection.playFile(fileUrl);
        bot._voice.playing = true;

        bot._voice.dispatcher.on("speaking", (event) => {
          if (!event) {
            bot._voice.channel.leave();
            bot._voice.playing = false;
          }
        });
      });
      return true;
    }
  }

  return false;
};
