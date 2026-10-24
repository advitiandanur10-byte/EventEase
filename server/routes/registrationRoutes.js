
const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

// Register for an event
router.post("/", protect, async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required"
      });
    }

    if (!req.user.id) {
      return res.status(401).json({
        message: "Invalid user token"
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    const existingRegistration = await Registration.findOne({
      user: req.user.id,
      event: eventId
    });

    if (existingRegistration) {
      return res.status(409).json({
        message: "You are already registered for this event"
      });
    }

    const registration = await Registration.create({
      user: req.user.id,
      event: eventId
    });

    res.status(201).json({
      message: "Successfully registered for the event",
      registration
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You are already registered for this event"
      });
    }

    console.error("Registration error:", error);

    res.status(500).json({
      message: "Error registering for event"
    });
  }
});

// Get events the logged-in user has registered for
router.get("/my", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id
    }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Fetch registrations error:", error);

    res.status(500).json({
      message: "Error fetching your registrations"
    });
  }
});

module.exports = router;
