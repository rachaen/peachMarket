const config = require("../../config/config.js");
const postRepository = require("./postRepository.js");

const postService = {
  createPost: async (req, res) => {
    let imgName = "";
    const file = req.files;
    const imgPath = file[0].destination;
    const userId = req.userId;

    //imgName concat ,
    for (let i = 0; i < file.length; i++) {
      if (i == file.length - 1) {
        imgName += file[i].filename;
      } else {
        imgName += `${file[i].filename},`;
      }
    }
    const { postId, title, category, price, priceOffer, contents } = req.body;
    const createPostResult = await postRepository.createPost({ postId, userId, title, category, price, priceOffer, contents, imgPath, imgName });
    if (!createPostResult) {
      res.status(409).json({ result: false });
    }
    res.status(200).json({ result: true });
  },
};

module.exports = postService;
