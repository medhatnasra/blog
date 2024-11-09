const {
  createCommentController,
  getAllCommentsController,
} = require("../controllers/commentControllers");

const {
  verifytoken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/", verifytoken, createCommentController);
router.get("/", verifyTokenAndAdmin, getAllCommentsController);

module.exports = router;
