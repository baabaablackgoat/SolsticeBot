module.exports = function(msg) {
    const mentions = msg.mentions.users.array();

    return mentions.map(function(mention){
         return mention.id;
    });
};