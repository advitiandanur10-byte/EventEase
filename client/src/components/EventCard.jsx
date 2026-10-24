
function EventCard({ event, user, onRegister }) {
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

      {user && user.role === "user" && (
        <button
          type="button"
          onClick={() => onRegister(event._id)}
        >
          Register for Event
        </button>
      )}

      {!user && (
        <p>Log in to register for this event.</p>
      )}
    </div>
  );
}

export default EventCard;

