module.exports = function(msg) {
    const mentions = msg.mentions.users.array();
    let id_list = [];
    let values = {};
    mentions.forEach(function(mention){
         id_list.push(mention.id);
         values[mention.id]=msg.guild.members.get(mention.id);
    });
    return {id_list,values};
};