var express = require("express");
const robot = require("robotjs");

var router = express.Router();

//待機関数
const sleep = (sec) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* postリクエスト */
router.post("/", (req, res, next) => {
  const reqAS400_type = req.body.AS400_type; //入力したい文字列がAS400_typeに入ってくる
  const reqAS400_typeOption = req.body.AS400_typeOption; //入力したい文字列がAS400_typeに入ってくる

  if (reqAS400_type) {
    robotType(reqAS400_type);
  }
  if (reqAS400_typeOption) {
    robotTypeOption("runqry *n ", reqAS400_typeOption, " rcdslt(*yes)");
  }

  res.redirect("/");
});

//自動入力関数 引数に入力内容を記入する
const robotType = async (txt) => {
  robot.keyToggle("alt", "down");
  robot.keyTap("tab");
  robot.keyToggle("alt", "up");
  //実際の入力
  await sleep(0.5);
  robot.keyTap("escape");
  await sleep(0.3);
  robot.typeString(txt);
};

//自動入力関数 引数に入力内容を記入する
const robotTypeOption = async (preTxt, midTxt, postText) => {
  robot.keyToggle("alt", "down");
  robot.keyTap("tab");
  robot.keyToggle("alt", "up");
  //実際の入力
  await sleep(0.5);
  robot.keyTap("escape");
  await sleep(0.3);
  robot.typeString(preTxt);
  robot.typeString(midTxt);
  robot.typeString(postText);
};

module.exports = router;
