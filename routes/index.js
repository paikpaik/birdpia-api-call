const express = require("express");
const {
  renderMain,
  getMyPosts,
  searchByHashtag,
  test,
} = require("../controllers/index");

const router = express.Router();

// 브라우저에서 요청 test
router.get("/", renderMain);

// posts 스크랩핑 api test
router.get("/myposts", getMyPosts);
// hashtag 스크랩핑 api test
router.get("/search/:hashtag", searchByHashtag);

// token 발행 api test
router.get("/test", test);

module.exports = router;
