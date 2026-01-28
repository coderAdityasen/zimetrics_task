const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.route.js");

const app = express();
const PORT = 8000;

// mongodb connectivity to mongodbcompass locally
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testapp");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MongoDB connected!");
});

// api routes to book api in book route file
app.use("/api", bookRoutes);

// port running on 8000 locally
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
