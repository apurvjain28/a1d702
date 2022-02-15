const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation, { through: "User_Conversation" });
Conversation.belongsToMany(User, { through: "User_Conversation" });
Message.belongsTo(Conversation);
Message.hasMany(User);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
};
