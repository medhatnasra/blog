const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = {
  CommentModel,
};
