//Adds a song to the queue
module.exports = function(msg, item) {
    queue.push(item);
    msg.channel.sendMessage(item.name + " was added to queue! Position: " + parseInt(queue.length));
}