const router = require("express").Router();

const {
  verifytoken,
  verifyTokenAndOnlyUser,
} = require("../middlewares/verifyToken");
const photoUpload = require("../middlewares/uploadPhotos");

const {
  getPostController,
  createPostController,
  getSinglePosteController,
  getPostsCount,
  deletePostController,
  updatePostController,
  updatePostImageController,
  togglePostLikeController,
} = require("../controllers/postControllers");

router.get("/", verifytoken, getPostController);
router.get("/:id", verifytoken, getSinglePosteController);
router.get("/count", getPostsCount);
router.delete("/:id", verifytoken, deletePostController);
router.put("/:id", verifytoken, updatePostController);
router.put("/like/:id", verifytoken, togglePostLikeController);

router.put(
  "/image/:id",
  verifytoken,
  photoUpload.single("image"),
  updatePostImageController
);

router.post(
  "/",
  verifytoken,
  photoUpload.single("image"),
  createPostController
);

module.exports = router;
