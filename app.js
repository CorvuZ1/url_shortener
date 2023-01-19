require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000/");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.use("/", require("./routes/redirect"));
app.use("/", require("./routes/auth"));

app.use((req, res, next) => {
  if (!req.session.isAuth) {
    res.cookie("isAuth", "false");
    return res.sendStatus(404);
  }
  next();
});

app.use("/api", require("./routes/link_shortener"));

const { MONGO_CONNECT } = process.env;
const PORT = process.env.PORT || 5000;

async function init() {
  try {
    const mongoConnect = await mongoose.connect(MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoConnect && console.log("MongoDB подключен");
    app.listen(PORT, () => console.log(`Сервер запущен, порт ${PORT}`));
  } catch (error) {
    console.log(`Ошибка инициализации: ${error.message}`);
    process.exit(1);
  }
}
init();
