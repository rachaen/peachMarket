const express = require("express");

const upload = require("../middlewares/post/multer.js");
const isAuth = require("../middlewares/auth/auth.js");
const postService = require("../middlewares/post/postService.js");

const router = express.Router();

/**
 * 포스트 글 등록
 */
router.post("/createPost", isAuth, upload.postsUpload.array("img"), postService.createPost);

router.get("/getPosts", postService.getPosts);

router.get("/getDetailPost", postService.getDetailPost);

router.post("/modifyPost", upload.postsUpload.array("img"), postService.modifyPost);

module.exports = router;
