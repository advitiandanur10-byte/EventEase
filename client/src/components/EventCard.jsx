
import AttendeeList from "./AttendeeList";

function EventCard({ event, user, onRegister }) {
  const token = localStorage.getItem("token");

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <p>
        <strong>Date:</strong>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Seats:</strong>{" "}
        {event.registeredCount || 0} / {event.seatLimit || 30}
      </p>

      {user?.role === "user" && (
        <button type="button" onClick={() => onRegister(event._id)}>
          Register for Event
        </button>
      )}

      {!user && <p>Log in to register for this event.</p>}

      {user?.role === "organizer" && (
        <AttendeeList eventId={event._id} token={token} />
      )}
    </div>
  );
}

export default EventCard;

