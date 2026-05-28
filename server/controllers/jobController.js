const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ user: req.user.id });
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    user: req.user.id,
  });
  res.json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  res.json({ message: "Deleted" });
};