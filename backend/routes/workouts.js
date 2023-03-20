const express = require("express");
const workoutController = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth);

// Get all workouts
router.get("/", workoutController.getWorkouts);

// Get single workout
router.get("/:workoutId", workoutController.getSingleWorkout);

router.post("/", workoutController.createWorkout);

router.delete("/:workoutId", workoutController.deleteWorkout);

router.patch("/:workoutId", workoutController.updateWorkout);

module.exports = router;
