const axios = require("axios");
// 서버에서 서버로 요청보내는 axios

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN;

const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response?.status === 419) {
      delete req.session.jwt;
      return request(req, api); // 재귀함수로 재호출 후 재발급
    }
    return error.response;
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
    );
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderMain = (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
};

exports.test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.status(tokenResult.data?.code).json(tokenResult.data);
      }
    }
    const result = await axios.get(`${URL}/test`, {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) {
      return res.json(error.response.data);
    }
    return next(error);
  }
};
