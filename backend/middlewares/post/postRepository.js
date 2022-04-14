const db = require("../../config/database.js");

const postRepository = {
  createPost: async (post) => {
    const { postId, userId, title, category, price, priceOffer, contents, imgPath, imgName } = post;

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

  getPosts: async () => {
    return db.execute("SELECT postId, title, price, imgPath, imgName FROM post").then((result) => {
      return result[0];
    });
  },
};

module.exports = postRepository;
