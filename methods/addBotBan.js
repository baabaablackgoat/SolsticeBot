//Used in applyBotBan to check if the user is already botbanned. If not, create new entry. If they are, update expiry date.
module.exports = function(id, expirytime) {
    if (!userlist.banned.hasOwnProperty(id)) {
        userlist.banned[id] = {};
    }
    userlist.banned[id].expires = expirytime;
    userlist.banned[id].id = Number(id);
    fs.writeFile('./data/userlist.json', JSON.stringify(userlist,"  ","  "));
    if (settings.useDiscordRoles) {
        if (!settings.botbanned_role_id) {
            msg.channel.sendMessage("You didn't set up a botbanned role!");
        } else {
            //Do shit to assign a role
        }
    }
}