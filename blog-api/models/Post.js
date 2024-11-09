const { timeStamp } = require("console");
const mongoose = require("mongoose");

const Postschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Postschema.virtual("Comments", {
  ref: "Comment",
  foreignField: "PostId",
  localField: "_id",
});

const PostModel = mongoose.model("Post", Postschema);

module.exports = {
  PostModel,
};
