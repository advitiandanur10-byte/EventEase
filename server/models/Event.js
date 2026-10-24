
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  // Maximum number of participants allowed
  seatLimit: {
    type: Number,
    required: true,
    min: 1,
    default: 30
  },

  registeredCount: {
  type: Number,
  default: 0,
  min: 0
}
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
