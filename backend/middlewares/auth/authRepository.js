const db = require("../../config/database.js");

const authRepository = {
  signup: async (user) => {
    console.log(user);
    const { userId, userName, nickName, email, password, phoneNumber, address, birthday, latitude, longitude } = user;
    return db
      .execute(
        "INSERT INTO users (userId, userName, nickName, email, password, phoneNumber, address, birthday, latitude, longitude) VALUES(?,?,?,?,?,?,?,?,?,?)",
        [userId, userName, nickName, email, password, phoneNumber, address, birthday, latitude, longitude]
      )
      .then((result) => {
        return result;
      });
  },
  findByNickName: async (nickName) => {
    db.execute("SELECT * FROM users WHERE nickName=?", [nickName]) //
      .then((result) => {
        return result[0][0];
      });
  },

  findByEmail: async (email) => {
    return db //
      .execute("SELECT * FROM users WHERE email=?", [email]) //
      .then((result) => {
        return result[0][0];
      });
  },

  findPhoneNumber: async (phoneNumber) => {
    return db //
      .execute("SELECT * FROM users WHERE phoneNumber=?", [phoneNumber])
      .then((result) => {
        return result[0][0];
      });
  },
};

module.exports = authRepository;
