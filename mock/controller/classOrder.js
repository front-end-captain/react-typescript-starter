const Router = require("express").Router();

Router.get("/file", (request, response) => {
  response.send({ code: 1, message: "success", data: { name: "viking" } });
});

module.exports = Router;
