require("dotenv").config();
const express = require("express");
const connect = require("./Database/db");
const MainRoute = require("./routes/Main");
const BackRoute = require("./routes/App");
const app = express();
const port = 3000;
const path = require("path");
const hbs = require("hbs");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials/");
app.use(express.static("staging/assets/"));
app.use(express.static("assets"));
app.use("/js", express.static(path.resolve(__dirname, "/staging/assets/js")));
app.use(
  "/footer-img",
  express.static(path.resolve(__dirname, "/assets/footer-img"))
);
app.use("/css", express.static(path.resolve(__dirname, "/assets/css")));
app.use("/css", express.static(path.resolve(__dirname, "/staging/assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "/staging/assets/img")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// Flash middleware
app.use(flash());
// Parse application/json
app.use(bodyParser.json());
app.use("/", MainRoute);
app.use("/api", BackRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
