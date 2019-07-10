const Router = require("express").Router();

Router.post("/time", (_, response) => {
  const date = new Date();
  return response.json({ code: 1, message: "success", data: { timestamp: Number(date) } });
});


module.exports = Router;
