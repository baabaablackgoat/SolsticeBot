module.exports = function(player){
    player.nowPlaying = player.queue.shift();
};