const config = require("../../config/config.js");
const postRepository = require("./postRepository.js");
const multer = require("./multer.js");
const { v4 } = require("uuid");

const postService = {
  createPost: async (req, res) => {
    let path = "";
    const file = req.files;
    if (file.length > 0) {
      imgPath = file[0].destination.split("public/uploads")[1];
    } else {
      req.body.postId = v4();
    }

    const userId = req.userId;
    //imgName concat ,
    for (let i = 0; i < file.length; i++) {
      if (i == file.length - 1) {
        path += `${imgPath}/${file[i].filename}`;
      } else {
        path += `${imgPath}/${file[i].filename},`;
      }
    }
    const { postId, title, category, price, priceOffer, contents } = req.body;
    const createPostResult = await postRepository.createPost({
      postId,
      userId,
      title,
      category,
      price,
      priceOffer,
      contents,
      path,
    });
    if (!createPostResult) {
      return res.status(409).json({ result: false });
    }
    multer.modifyUUid();
    res.status(200).json({ result: true });
  },
  getPosts: async (req, res) => {
    const result = await postRepository.getPosts();
    for (let i = 0; i < result.length; i++) {
      if (result[i].imgPath) {
        const imgNameArray = result[i].imgPath.split(",");
        console.log(imgNameArray);
        result[i].imgPath = imgNameArray;
        result[i].currentSlide = 0;
      }
    }
    if (!result) {
      return res.status(409).json({ result: false });
    }
    res.status(200).json({ result });
  },

  getDetailPost: async (req, res) => {
    const postId = req.query.postId;
    const result = await postRepository.getDetailPost(postId);
    if (!result) {
      return res.status(409).json({ result: false });
    }
    if (result.imgPath) {
      const imgNameArray = result.imgPath.split(",");
      result.imgPath = imgNameArray;
      result.currentSlide = 0;
    }
    res.status(200).json({ result });
  },
};

module.exports = postService;
