"use strict";

module.exports = function (bot) {
  const result = bot._voice.playing;

  bot._voice.playing = false;
  bot._voice.dispatcher = null;

  if (bot._voice.channel && bot._voice.channel.leave) {
    bot._voice.channel.leave();

  }

  return result;
};
