const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");
const postId = v4();
const postsUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      console.log("hi");
      req.body.postId = postId;
      if (!fs.existsSync(`public/uploads/images/${postId}`)) {
        fs.mkdirSync(`public/uploads/images/${postId}`);
      }
      cb(null, `public/uploads/images/${postId}`);
    },
    filename(req, file, cb) {
      console.log("multer");

      //file.originalname : 파일이름.확장자
      //확장자 뽑기
      const ext = path.extname(file.originalname);

      //사용자가 보낸 파일이름만 뽑기
      const baseName = path.basename(file.originalname, path.extname(file.originalname));

      //db에서 이미지이름 저장 분류를 , 로 하기위해 파일이름에 , 있는것을 1로변경
      const fileName = baseName.replaceAll(",", "1");
      cb(null, path.basename(fileName, ext) + Date.now() + ext);
    },
  }),
});

module.exports.postsUpload = postsUpload;
