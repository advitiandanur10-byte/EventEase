
import { useState } from "react";

function AttendeeList({ eventId, token }) {
  const [attendees, setAttendees] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const loadAttendees = async () => {
    if (show) {
      setShow(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/registrations/event/${eventId}/attendees`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Could not load attendees");
        return;
      }

      setAttendees(data.attendees || []);
      setMessage("");
      setShow(true);
    } catch (error) {
      setMessage("Could not connect to the server.");
    }
  };

  return (
    <div>
      <button type="button" onClick={loadAttendees}>
        {show ? "Hide Attendees" : "View Attendees"}
      </button>

      {message && <p>{message}</p>}

      {show && (
        <div>
          <h4>Registered Attendees ({attendees.length})</h4>

          {attendees.length === 0 ? (
            <p>No attendees registered yet.</p>
          ) : (
            <ul>
              {attendees.map((attendee, index) => (
                <li key={`${attendee.email}-${index}`}>
                  {attendee.name} — {attendee.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AttendeeList;
