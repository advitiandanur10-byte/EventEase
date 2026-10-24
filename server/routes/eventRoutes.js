const express = require("express");
const router = express.Router();
console.log("eventRoutes.js loaded");

const Event = require("../models/Event");
const { protect, organizerOnly } = require("../middleware/authMiddleware");

router.post("/", protect, organizerOnly, async (req, res) => {
    try {
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location
        });

        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({
            message: "Error creating event",
            error: error.message
        });
    }
});
// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        });
    }
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching event",
            error: error.message
        });
    }
});
// Update an event
router.put("/:id", protect, organizerOnly, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({
            message: "Error updating event",
            error: error.message
        });
    }
});

// Delete an event
router.delete("/:id", protect, organizerOnly, async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting event",
            error: error.message
        });
    }
});

module.exports = router;