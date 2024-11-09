const { CommentModel } = require("../models/Comment");
const { UserModel } = require("../models/User");
const Joi = require("joi");

/**---------------------------------
* @desc : Create Comment
* @route : /api/comment/
* @method  POST 
* @access  Logged in User
-----------------------------------*/
module.exports.createCommentController = async (req, res) => {
  const schema = CommentValid();
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const profile = await UserModel.findById(req.user.id);

  const result = await CommentModel.create({
    PostId: req.body.postid,
    text: req.body.text,
    user: req.user.id,
    username: profile.firstname,
  });
  res.status(201).json(result);
};

/**---------------------------------
* @desc : Get All Comments
* @route : /api/comment/
* @method  GET
* @access  Private(Only Admin)
-----------------------------------*/
module.exports.getAllCommentsController = async (req, res) => {
  const result = await CommentModel.find();
  res.status(200).json(result);
};

//JOI VALIDATION

CommentValid = () => {
  const schema = Joi.object({
    text: Joi.string().min(5).max(200).required(),
    postid: Joi.string().required(),
    user: Joi.string().required(),
    firstname: Joi.string().required(),
  });
  return schema;
};
