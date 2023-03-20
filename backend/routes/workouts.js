const express = require("express");
const workoutController = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Require auth for all workout routes
router.use(requireAuth);

// Get all workouts
// http://localhost/api/workouts/ - GET
router.get("/", workoutController.getWorkouts);

// Get single workout
// http://localhost/api/workouts/:id - GET
router.get("/:workoutId", workoutController.getSingleWorkout);

// Create new workout
// http://localhost/api/workouts/ - POST
router.post("/", workoutController.createWorkout);

// Delete workout
// http://localhost/api/workouts/:id - DELETE
router.delete("/:workoutId", workoutController.deleteWorkout);

// Update workout
// http://localhost/api/workouts/id - PATCH
router.patch("/:workoutId", workoutController.updateWorkout);

module.exports = router;
