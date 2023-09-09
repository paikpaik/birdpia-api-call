const express = require("express");
const { getMyPosts, searchByHashtag, test } = require("../controllers/index");

const router = express.Router();

// posts 스크랩핑 api test
router.get("/myposts", getMyPosts);
// hashtag 스크랩핑 api test
router.get("/search/:hashtag", searchByHashtag);

// token 발행 api test
router.get("/test", test);

module.exports = router;
