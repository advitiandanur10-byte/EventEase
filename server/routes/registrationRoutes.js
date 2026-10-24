
const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect } = require("../middleware/authMiddleware");

// Register for an event
router.post("/", protect, async (req, res) => {
  let seatReserved = false;
  let eventId;

  try {
    eventId = req.body.eventId;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required"
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID"
      });
    }

    // Atomically reserve a seat only if capacity remains
    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $expr: {
          $lt: [
            { $ifNull: ["$registeredCount", 0] },
            { $ifNull: ["$seatLimit", 30] }
          ]
        }
      },
      {
        $inc: { registeredCount: 1 }
      },
      { new: true }
    );

    if (!event) {
      const exists = await Event.exists({ _id: eventId });

      return res.status(exists ? 409 : 404).json({
        message: exists
          ? "Sorry, this event is full."
          : "Event not found"
      });
    }

    seatReserved = true;

    // Create the registration
    await Registration.create({
      user: userId,
      event: eventId
    });

    res.status(201).json({
      message: "Successfully registered for the event",
      eventTitle: event.title,
      registeredCount: event.registeredCount,
      seatLimit: event.seatLimit
    });
  } catch (error) {
    // Release the reserved seat if registration failed
    if (seatReserved) {
      await Event.updateOne(
        { _id: eventId },
        { $inc: { registeredCount: -1 } }
      ).catch(console.error);
    }

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

// View the logged-in user's registrations
router.get("/my", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id
    }).populate("event");

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Fetch registrations error:", error);

    res.status(500).json({
      message: "Error fetching registrations"
    });
  }
});

const { organizerOnly } = require("../middleware/authMiddleware");

// Get attendees for an event (organizers only)
router.get("/event/:eventId/attendees", protect, organizerOnly, async (req, res) => {
  try {
    const registrations = await Registration.find({
      event: req.params.eventId
    }).populate("user", "name email");

    res.status(200).json({
      count: registrations.length,
      attendees: registrations.map((registration) => ({
        name: registration.user.name,
        email: registration.user.email,
        registeredAt: registration.registeredAt
      }))
    });
  } catch (error) {
    console.error("Error fetching attendees:", error);

    res.status(500).json({
      message: "Error fetching attendee list"
    });
  }
});



module.exports = router;

