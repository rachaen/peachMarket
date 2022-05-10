const fs = require("fs");
const path = require("path");
const moment = require("moment");

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
        result[i].imgPath = imgNameArray;
        result[i].currentSlide = 0;
      }
      const nowDate = moment();
      const regDate = result[i].regDate;

      //시간 차이 구하기
      const minute = moment.duration(nowDate.diff(regDate)).asMinutes();
      if (minute < 60) {
        result[i].regDate = Math.ceil(minute) + "분전";
      } else {
        const hour = moment.duration(nowDate.diff(regDate)).asHours();
        if (hour < 24) {
          result[i].regDate = Math.ceil(hour) + "시간전";
        } else {
          console.log(moment.duration(nowDate.diff(regDate)).asDays);
          result[i].regDate = Math.ceil(moment.duration(nowDate.diff(regDate)).asDays()) + "일전";
        }
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

  deletePost: async (req, res) => {
    const postId = req.query.postId;
    const result = await postRepository.getDetailPost(postId);
  },

  modifyPost: async (req, res) => {
    const deleteImage = req.body.deleteImage;
    const imgFiles = req.files;
    if (imgFiles || deleteImage) {
      const PATH = "public/uploads/images";
      const postId = req.body.postId;
      const imgDirPATH = `${PATH}${path.sep}${postId}`;
      const directoryExists = fs.existsSync(imgDirPATH);

      //파일 존재 안하면 오류
      if (!directoryExists) {
        return res.status(409).json({ result: false });
      }

      //기존에 있던 이미지 배열 반환
      const imgArr = getImgName(imgDirPATH);
      if (deleteImage) {
        if (typeof deleteImage === Object) {
          const newImgPath = deleteImage.filter((data) => {
            fs.unlinkSync(`${imgDirPATH}${path.sep}${data}`);
            imgArr.map((test) => {
              return test !== data;
            });
          });
          if (getImgName(imgDirPATH).length === 0) {
            fs.rmdirSync(`${imgDirPATH}`);
          }
        } else {
          fs.unlinkSync(`${imgDirPATH}${path.sep}${deleteImage}`);
          const imgFile = getImgName(imgDirPATH);
          if (!imgFile) {
            fs.rmdirSync(`${imgDirPATH}`);
          }
        }
      }

      const imgPath = getImgName(imgDirPATH);
      if (imgPath) {
        let data = "";
        if (typeof imgPath === Object) {
          imgPath.map((data) => {
            data += `${imgDirPATH}${path.sep}${data},`;
          });
        } else {
          data += `${imgDirPATH}${path.sep}${imgPath}`;
        }
      } else {
      }
    }
  },
};

const getImgName = (imgDirPATH) => {
  if (!imgDirPATH) {
    return;
  }
  const imgFile = fs.readdirSync(imgDirPATH);
  if (imgFile) {
    return imgFile;
  }
  return imgFile;
};

module.exports = postService;
