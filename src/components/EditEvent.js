import React, { useState, useEffect } from "react";
import { useLocation as useRouterLocation, useNavigate } from "react-router-dom";
import { Client, Databases } from 'appwrite'; 
import './EditEvent.css'; 

const EditEvent = () => {
    
    const [eventData, setEventData] = useState({
        id: "", 
        name: "",
        description: "",
        organizer: "",
        category: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    
    const routerLocation = useRouterLocation(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        
        const { $id, name, description, organizer, category, location, date, startTime, endTime } = routerLocation.state?.event || {};
        setEventData({
            id: $id || "", 
            name: name || "",
            description: description || "",
            organizer: organizer || "",
            category: category || "",
            location: location || "",
            date: date || "",
            startTime: startTime || "",
            endTime: endTime || "",
        });
    }, [routerLocation]);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const client = new Client();
        client.setEndpoint('https://cloud.appwrite.io/v1'); 
        client.setProject('670c98d4003ae582e8dd'); 

        
        const databases = new Databases(client);

        try {
            
            const updatedEvent = await databases.updateDocument('670ca76d0028a15834bc', '670ca78500354553059f', eventData.id, {
                name: eventData.name,
                description: eventData.description,
                organizer: eventData.organizer,
                category: eventData.category,
                location: eventData.location,
                date: eventData.date,
                startTime: eventData.startTime,
                endTime: eventData.endTime,
            });

            console.log("Event Updated:", updatedEvent); 
            navigate("/"); 
        } catch (error) {
            console.error("Error updating event:", error.message); 
        }
    };

    return (
        <div className="edit-event-container">
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <h3>To : {eventData.name}</h3>
                <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    placeholder="Event Description"
                    required
                />
                <input
                    type="text"
                    name="organizer"
                    value={eventData.organizer}
                    onChange={handleChange}
                    placeholder="Organizer"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={eventData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="startTime"
                    value={eventData.startTime}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="endTime"
                    value={eventData.endTime}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
