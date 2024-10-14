
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateEvent from "./components/CreateEvent";
import EventList from "./components/EventList";
import EditEvent from "./components/EditEvent";
import "./App.css"; 

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<EventList />} /> 
      <Route path="/create" element={<CreateEvent />} /> 
      <Route path="/edit" element={<EditEvent />} />
    </Routes>
  </Router>
);

export default App;
