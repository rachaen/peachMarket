const config = require("../../config/config.js");
const postRepository = require("./postRepository.js");
const multer = require("./multer.js");
const { v4 } = require("uuid");

const postService = {
  createPost: async (req, res) => {
    let imgName = "";
    let imgPath = "";
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
        imgName += `${imgPath}/${file[i].filename}`;
      } else {
        imgName += `${imgPath}/${file[i].filename},`;
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
      imgPath,
      imgName,
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
      if (result[i].imgName) {
        const imgNameArray = result[i].imgName.split(",");
        result[i].imgName = imgNameArray;
        result[i].currentSlide = 0;
      }
    }
    if (!result) {
      return res.status(409).json({ result: false });
    }
    res.status(200).json({ result });
  },
};

module.exports = postService;
