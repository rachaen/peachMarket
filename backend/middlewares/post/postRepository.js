const db = require("../../config/database.js");

const postRepository = {
  createPost: async (post) => {
    const { postId, userId, title, category, price, priceOffer, contents, imgPath, imgName } = post;
    console.log(postId);
    console.log(userId);
    console.log(category);
    console.log(price);
    console.log(priceOffer);
    console.log(contents);
    console.log(imgPath);
    console.log(imgName);

    return db
      .execute("INSERT INTO post (postId, userId, title, category, price, priceOffer, contents, imgPath, imgName) VALUES(?,?,?,?,?,?,?,?,?)", [
        postId,
        userId,
        title,
        category,
        price,
        priceOffer,
        contents,
        imgPath,
        imgName,
      ])
      .then((result) => {
        return result;
      });
  },
};

module.exports = postRepository;
