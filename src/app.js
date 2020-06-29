import express from "express";
import cookieParser from "cookie-parser"; // parses cookies
import session from "express-session"; // parses sessions
import favicon from "serve-favicon"; // serves favicon
import cors from "cors"; // allows cross-domain requests
import bodyParser from "body-parser"; // middleware to handle HTTP requests
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import "regenerator-runtime/runtime";
import socketIO from "socket.io";
require("dotenv").config();

const app = express(); // create a new app

const IS_PRODUCTION = app.get("env") === "production";
if (IS_PRODUCTION) {
  app.set("trust proxy", 1); // secures the app if it is running behind Nginx/Apache/similar
}

app.use(helmet()); // make it the first thing your express app uses
app.use(cors()); // allows cross domain requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json()); // allows POST requests with JSON
app.use(express.urlencoded({ extended: false })); // allows POST requests with GET-like parameters
app.use(cookieParser()); // Parses cookies
app.use(favicon(path.join(__dirname, "../public", "favicon.ico"))); // <-- location of your favicon
app.use(express.static(path.join(__dirname, "../public"))); // <-- location of your public dir
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(morgan("dev"));

// Sessions
app.use(
  session({
    secret: "happy-halloween", //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false //required
  })
);

const BACK_PORT = process.env.NODE_PORT || 8080;
const server = app.listen(BACK_PORT, () =>
  console.log(`server listening on port ${BACK_PORT}`)
);
const io = socketIO.listen(server);
io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
});
app.use((req, res, next) => {
  res["io"] = io;
  next();
});

export { app, io };
