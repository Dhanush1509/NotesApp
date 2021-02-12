const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
// const mongoose = require("mongoose")
const User = require("../models/User");
const Note = require("../models/Note");

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "server error" });
  }
});
router.post(
  "/",
  [
    auth,
    check("title", "title is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    const { title, description } = req.body;
    try {
      const note = new Note({ title, description,user:req.user.id });
      const sendNote = await note.save();
      res.send(sendNote);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ message: "server error" });
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  noteField = {};
  if (title) noteField.title = title;
  if (description) noteField.description = description;

  try {
    const isNote = await Note.findById(req.params.id);
    if (!isNote) return res.status(400).send("Contact not found");
    if (isNote.user.toString() !== req.user.id)
      return res
        .status(400)
        .send("You do not have permission to update this contact");
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteField },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const isNote = await Note.findById(req.params.id);
    if (!isNote) return res.status(400).send("Contact not found");
    if (isNote.user.toString() != req.user.id)
      return res
        .status(400)
        .send("You do not have permission to delete this contact");
    const notes = await Note.findByIdAndRemove(req.params.id);
    res.json({ notes });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "server error" });
  }
});
module.exports = router;
