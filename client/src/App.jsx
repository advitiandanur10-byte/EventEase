
import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CreateEvent from "./components/CreateEvent";
import EventCard from "./components/EventCard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: ""
  });

  // Restore logged-in user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }
  });

  const [showRegister, setShowRegister] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  // Create an event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before creating an event.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create event");
        return;
      }

      await fetchEvents();

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        seatLimit: "30"
      });

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Could not connect to the server.");
    }
  };

  // Register for an event
  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      alert("Please log in to register for an event.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/registrations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ eventId })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Successfully registered for this event!");
    } catch (error) {
      console.error("Event registration error:", error);
      alert("Could not connect to the server.");
    }
  };

  // Handle successful login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowRegister(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowRegister(false);

    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      seatLimit: "30"
    });
  };

  // Return to login after registration
  const handleRegistrationSuccess = () => {
    setShowRegister(false);
  };

  return (
    <div>
      <Navbar />

      <Hero />

      {/* Login and registration */}
      {!user && (
        <section className="login-section">
          {showRegister ? (
            <Register
              onRegisterSuccess={handleRegistrationSuccess}
              onSwitchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login setUser={handleLogin} />
          )}

          <button
            type="button"
            onClick={() => setShowRegister((previous) => !previous)}
          >
            {showRegister
              ? "Back to Login"
              : "New here? Create an account"}
          </button>
        </section>
      )}

      {/* Logged-in user information */}
      {user && (
        <section className="login-section">
          <p>
            Welcome, <strong>{user.name}</strong>!
          </p>

          <p>
            Account type: <strong>{user.role}</strong>
          </p>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>
      )}

      {/* Organizer-only event creation */}
      {user && user.role === "organizer" && (
        <CreateEvent
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Upcoming events */}
      <section className="events-section">
        <h2>Upcoming Events</h2>

        <div className="event-container">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                user={user}
                onRegister={handleRegister}
              />
            ))
          ) : (
            <p>No events found. Please check back later.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;

