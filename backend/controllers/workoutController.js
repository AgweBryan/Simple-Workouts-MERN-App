const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  // filter workouts by user id
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

const getSingleWorkout = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(workoutId);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;
  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (e) {
    res.status(400).json({ error: "All fields are required" });
  }
};

// Delete workout
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: workoutId });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: workoutId },
    { ...req.body }
  );
  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
