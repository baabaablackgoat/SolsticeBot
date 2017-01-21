module.exports = function(msg) {
    let mentions = msg.mentions.users;
    mentions.map(function(mention){
         return mention.id;
    });
};