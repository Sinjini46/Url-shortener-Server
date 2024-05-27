const express = require("express");
const cors = require("cors"); // Add this line
const urlRoute = require("./routes/url");
const { connectDB } = require("./utils/connect");
const URL = require("./models/url");
const dotenv= require("dotenv");

dotenv.config();

const app = express();
const PORT = 8001;

connectDB();

app.use(cors()); // Add this line

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortid = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortid },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
