import React from 'react';
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import './css/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faCalendarAlt, faClock, faMapMarkedAlt, faMapMarker, faMapMarkerAlt, faTicket} from '@fortawesome/free-solid-svg-icons';

const Event = () => {
    const event = {
      id: 1,
      name: 'Summer Jam Fest',
      imageUrl: '/images/event-1.jpg',
    }

  return (
    <div className="container-fluid mt-2">
    <h3 className="text-center text-primary mb-3">Events</h3>
    
    </div>
  );
};

export default Event;
