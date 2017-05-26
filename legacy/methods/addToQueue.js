//Adds a song to the queue
module.exports = function(bot,msg,item) {
    bot._instance.queue.push(item);
    msg.channel.send(item.name + " was added to queue! Position: " + parseInt(bot._instance.queue.length));
};