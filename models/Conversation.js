const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    }, //members[0]-sender members[1]-reciver
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);