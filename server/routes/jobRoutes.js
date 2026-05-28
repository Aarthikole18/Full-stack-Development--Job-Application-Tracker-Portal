const express = require("express");
const router = express.Router();

const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getJobs);
router.post("/", auth, createJob);
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;