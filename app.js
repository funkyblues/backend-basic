const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

const admin = require("./routes/admin");
const contacts = require("./routes/contacts");

const app = express();
const PORT = 3000;

nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

// middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  app.locals.isLogin = false;
  next();
});

app.get("/", (req, res) => {
  res.send("hello express");
});

function vipMiddleware(req, res, next) {
  console.log("최우선 미들웨어");
  next();
}

app.use("/admin", vipMiddleware, admin);
app.use("/contacts", contacts);

app.listen(PORT, () => {
  console.log("Express listening on port ", PORT);
});
