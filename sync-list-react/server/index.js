const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express server!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
