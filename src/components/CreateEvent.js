// src/components/CreateEvent.js
import React, { useState } from "react";
import { databases } from "../AppwriteConfig";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    organizer: "",
    category: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        "670ca76d0028a15834bc",
        "670ca78500354553059f",
        "unique()",
        event
      );
      alert("Event created successfully!");
      setEvent({
        name: "",
        description: "",
        organizer: "",
        category: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Error creating event:", error.message);
      alert("Failed to create event!");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div></div>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={event.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={event.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="organizer"
          placeholder="Organizer"
          value={event.organizer}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Intended"
          value={event.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={event.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="startTime"
          placeholder="Startingtime"
          value={event.startTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="endTime"
          placeholder="endingtime"
          value={event.endTime}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
