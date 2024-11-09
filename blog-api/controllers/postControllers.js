const Joi = require("joi");
const { PostModel } = require("../models/Post");
const { cloudinaryUpload, cloudinaryDelete } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");
const { CommentModel } = require("../models/Comment");

/**---------------------------------
* @desc : Get All Posts 
* @route : /api/post/
* @method GET 
* @access public 
-----------------------------------**/
module.exports.getPostController = async (req, res) => {
  const POST_PER_PAGE = 3; // Set number of posts per page
  const { pageNumber, category } = req.query; // Extract pageNumber and category from query parameters
  let result;

  // Retrieve posts based on pagination or category filtering
  if (pageNumber) {
    result = await PostModel.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .populate("user", ["-password"]); // Exclude password from user data
  } else if (category) {
    result = await PostModel.find({ category }).populate("user", ["-password"]);
  } else {
    result = await PostModel.find()
      .sort({ createdAt: -1 }) // Sort by most recent
      .populate("user", ["-password"]);
  }

  res.status(200).json(result); // Send retrieved posts as response
};

/**---------------------------------
* @desc : Create New Post 
* @route : /api/post/
* @method POST 
* @access Private (Only Logged User) 
-----------------------------------**/
module.exports.createPostController = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "You need An Image" }); // Validate presence of an image file
  }
  const schema = postValid(); // Validate post data
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Send validation error if any
  }
  const imagepath = path.join(__dirname, `../images/${req.file.filename}`); // Define image path

  const result = await cloudinaryUpload(imagepath); // Upload image to Cloudinary
  try {
    const post = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.user.id,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
    res.status(200).json(post); // Return created post
    fs.unlinkSync(imagepath); // Remove local file after upload
  } catch (err) {
    return { message: err.message }; // Handle error
  }
};

/**---------------------------------
* @desc : Get Single Post 
* @route : /api/post/:id
* @method Get 
* @access Private(Only Logged User) 
-----------------------------------**/
module.exports.getSinglePosteController = async (req, res) => {
  const result = await PostModel.findById(req.params.id).populate("Comments"); // Fetch post by ID
  if (result) {
    return res.status(200).json(result); // Return post if found
  }
};

/**---------------------------------
* @desc : Get Posts Count
* @route : /api/post/count
* @method Get 
* @access public 
-----------------------------------**/
module.exports.getPostsCount = async (req, res) => {
  const result = await PostModel.count(); // Count total posts
  res.status(200).json(result); // Send count as response
};

/**---------------------------------
* @desc : Delete Post
* @route : /api/post/
* @method Delete 
* @access private(only logged user and user himself and Admin) 
-----------------------------------**/
module.exports.deletePostController = async (req, res) => {
  const result = PostModel.findById(req.params.id); // Find post by ID
  if (!result) {
    return res.status(404).json({ message: "Not Found" }); // Return 404 if not found
  }

  // Check if the user is authorized to delete the post
  if (req.user.isAdmin || req.user.id === result.user.toString()) {
    await result.findByIdAndDelete(req.params.id); // Delete post
    await cloudinaryDelete(result.image.publicId); // Delete image from Cloudinary
    await CommentModel.deleteMany({ PostId: result._id }); // Delete related comments
  } else {
    res.status(403).json({ message: "Access Denied" }); // Unauthorized access
  }
};

/**---------------------------------
* @desc : Update Post Image
* @route : /api/post/image/:id
* @method PUT
* @access private(only logged user and user himself and Admin) 
-----------------------------------**/
module.exports.updatePostImageController = async (req, res) => {
  let result = await PostModel.findById(req.params.id); // Find post by ID
  if (!result) {
    return res.status(404).json({ message: "Post Not Found" }); // Return 404 if not found
  }
  // Check if the user is authorized to update the image
  if (req.user.id === result.user.toString() || req.user.isAdmin) {
    await cloudinaryDelete(result.image.publicId); // Delete current image from Cloudinary

    const imagepath = path.join(__dirname, `../images/${req.file.filename}`); // Define new image path
    const upload = await cloudinaryUpload(imagepath); // Upload new image to Cloudinary

    const finalresult = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          image: {
            url: upload.secure_url,
            publicId: upload.public_id,
          },
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Image updated successfully", finalresult }); // Send success response

    fs.unlinkSync(imagepath); // Remove local file after upload
  } else {
    return res.status(403).json({ message: "Access Denied Forbidden" }); // Unauthorized access
  }
};

/**---------------------------------
* @desc : Update Post
* @route : /api/post/:id
* @method PUT
* @access private(only logged user and user himself and Admin)  
-----------------------------------**/
module.exports.updatePostController = async (req, res) => {
  const schema = updatePostValid(); // Validate post data
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message }); // Send validation error if any
  }
  let result = await PostModel.findById(req.params.id); // Find post by ID
  if (!result) {
    return res.status(404).json({ message: "Post Not Found" }); // Return 404 if not found
  }
  // Check if the user is authorized to update the post
  if (req.user.id === result.user.toString() || req.user.isAdmin) {
    const finalresult = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "updated successfully", finalresult }); // Send success response
  }
};

/**---------------------------------
* @desc : Toggle Post Like
* @route : /api/post/like/:id
* @method PUT
* @access private(only logged user and user himself and Admin) 
-----------------------------------**/
module.exports.togglePostLikeController = async (req, res) => {
  const post = await PostModel.findById(req.params.id); // Find post by ID
  if (!post) {
    return res.status(404).json({ message: "Post Not found" }); // Return 404 if not found
  }
  const isToggled = post.like.find((l) => l.toString() === req.user.id); // Check if user has already liked the post
  if (isToggled) {
    newpost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { like: req.user.id }, // Remove like if already liked
      },
      { new: true }
    );
  } else {
    newpost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { like: req.user.id }, // Add like if not yet liked
      },
      { new: true }
    );
  }
  res.status(200).json(newpost); // Send updated post with like status
};

// JOI VALIDATION SCHEMAS
const postValid = () => {
  const schema = Joi.object({
    title: Joi.string().alphanum().min(3).max(30).required(), // Title validation
    description: Joi.string().min(10).required(), // Description validation
    category: Joi.string().required(), // Category validation
  });
  return schema;
};

const updatePostValid = () => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30), // Optional title validation
    description: Joi.string().min(10), // Optional description validation
    category: Joi.string(), // Optional category validation
  });
  return schema;
};
