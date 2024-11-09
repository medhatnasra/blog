const path = require("path");
const { cloudinaryDelete, cloudinaryUpload } = require("../utils/cloudinary");
const { UserModel } = require("../models/User");

/*---------------------------------
* @desc : Update User
* @route : /api/user/:id
* @method : POST 
* @access : Private 
-----------------------------------*/
module.exports.updateUserController = async (req, res) => {
  const schema = RegForumValid();
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    const result = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    res.status(200).json(result);
  }
};

/*---------------------------------
* @desc : Get Users
* @route : /api/user/
* @method : POST 
* @access : Private(OnlyAdmin)
-----------------------------------*/
module.exports.getUserController = async (req, res) => {
  const result = await UserModel.find().select("-password");
  res.status(200).json(result);
};
/*---------------------------------
* @desc : Get Single User
* @route : /api/user/:id
* @method : GET 
* @access : Private(Only Logged in User)
-----------------------------------*/
module.exports.getSingleUserController = async (req, res) => {
  const result = await UserModel.findById(req.params.id)
    .select("-password")
    .populate("posts");
  res.status(200).json(result);
};
/*---------------------------------
* @desc : Upload Photo
* @route : /profile/upload-photo
* @method : POST
* @access : Private(Only logged User)
-----------------------------------*/
module.exports.uploadUserProfile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file Provided" });
  }

  const imagepath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await cloudinaryUpload(imagepath);

  res.status(200).json({ message: "Image uploaded successfully ...." });
};
/**---------------------------------
* @desc : Delete User (NOT COMPLETED)
* @route : **** NOT COMPLETED
* @method : Delete 
* @access : Private 
-----------------------------------*/
module.exports.DeleteUserController = async (req, res) => {
  const result = await UserModel.find();
  res.status(200).json(result);
};
