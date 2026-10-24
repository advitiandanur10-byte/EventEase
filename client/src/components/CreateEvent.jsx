function CreateEvent({ formData, handleChange, handleSubmit }) {
  return (
    <section className="create-section">
      <h2>Create Event</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        
         <input
            type="number"
            name="seatLimit"
            placeholder="Maximum number of seats"
            min="1"
            value={formData.seatLimit}
            onChange={handleChange}
            required
          />


        <button type="submit">Create Event</button>
      </form>
    </section>
  );
}

export default CreateEvent;