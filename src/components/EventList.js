
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { databases } from "../AppwriteConfig";
import "./EventList.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      const response = await databases.listDocuments(
        "670ca76d0028a15834bc",
        "670ca78500354553059f"
      );
      setEvents(response.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error.message);
      setError("Failed to load events.");
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
  
    navigate("/edit", { state: { event } });
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        await databases.deleteDocument("670ca76d0028a15834bc", "670ca78500354553059f", eventId);
        // Refetch events after deletion
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error.message);
        setError("Failed to delete event.");
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.$id} className="event-item">
              <h3>Event:- {event.name}</h3>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Organizer:</strong> {event.organizer}</p>
              <p><strong>Intended:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
              <button onClick={() => handleEdit(event)} className="But2">Edit</button>
              <button onClick={() => handleDelete(event.$id)} className="But1">Delete</button>
            </li>
          ))
        ) : (
          <li>No events available.</li>
        )}
      </ul>
    </div>
  );
};

export default EventList;
