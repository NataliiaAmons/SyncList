const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
//const db = require("./config/database.js");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  session({
    //store: new (require("connect-pg-simple")(session))({
    //  pool: db,
    //  tableName: "user_sessions",
    //}),
    secret: "yourSecretKeyHere",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const purchaseRoutes = require("./routes/purchases");
app.use(purchaseRoutes);

const itemRoutes = require("./routes/items");
app.use(itemRoutes);

const uploadRoutes = require("./routes/uploads");
app.use(uploadRoutes);

const themeRoutes = require("./routes/theme");
app.use(themeRoutes);

const foldersRoutes = require("./routes/folders");
app.use(foldersRoutes);

const authRoutes = require("./routes/authentif");
app.use(authRoutes);

app.get("/", (req, res) => {
  res.json({ message: `Connected to server on port ${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
