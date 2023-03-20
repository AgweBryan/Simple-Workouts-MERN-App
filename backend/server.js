require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express();

// parse request body
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "NO such workout" });
});

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((_) => {
    // Listen for request
    app.listen(process.env.PORT, () =>
      console.log("Listening on port http://localhost:" + process.env.PORT)
    );
  })
  .catch((err) => console.log(err));
