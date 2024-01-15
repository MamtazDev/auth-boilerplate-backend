const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const usersRoutes = require("./routes/user.routes");

// Config
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Sever is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
