const db = require("../../config/database.js");

const postRepository = {
  createPost: async (post) => {
    console.log(post);
    const { postId, userId, title, category, price, priceOffer, contents, path } = post;
    if (path === "") {
      return db
        .execute("INSERT INTO post (postId, userId, title, category, price, priceOffer, contents) VALUES(?,?,?,?,?,?,?)", [
          postId,
          userId,
          title,
          category,
          price,
          priceOffer,
          contents,
        ])
        .then((result) => {
          return result;
        });
    }
    return db
      .execute("INSERT INTO post (postId, userId, title, category, price, priceOffer, contents, imgPath) VALUES(?,?,?,?,?,?,?,?)", [
        postId,
        userId,
        title,
        category,
        price,
        priceOffer,
        contents,
        path,
      ])
      .then((result) => {
        return result;
      });
  },

  getPosts: async () => {
    return db.execute("SELECT userId ,postId, title, price, regDate, imgPath FROM post").then((result) => {
      return result[0];
    });
  },

  getDetailPost: async (postId) => {
    return db.execute(`SELECT * FROM post where postId="${postId}"`).then((result) => {
      return result[0][0];
    });
  },
};

module.exports = postRepository;
