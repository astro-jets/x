// Libralies
import React from 'react';
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import useFetch from '../hooks/useFetch';
import Loader from './Loader';
// Fonts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faCalendarAlt, faClock, faMapMarkerAlt, faTicket} from '@fortawesome/free-solid-svg-icons';

// CSS
import './css/Events.css';


const Events = () => {
  const {data: events,isLoading,error} = useFetch('https://studiox.onrender.com/api/events'); 
  return (
    <div className="container-fluid mt-2">
    <h3 className="text-center text-primary mb-3">Events</h3>
    <p className="text-light p-1">
    Use the promo code <span className="text-primary text-lg">studioX100</span> and get 
    <span className="text-primary text-lg"> 5% off</span> on your purchase.
    </p>
    { isLoading ? <Loader/> :
      <OwlCarousel className="owl-theme" loop items={2} autoWidth={true} margin={10} dots={false}>
        {events.map((event) => (
          <Link to={`/events/${event.id}`}>
            <div key={event.id} className="event-slide col-12">
              <img className="event-image" src={event.poster} alt={event.name}/>
              <div className="event-caption col-12">
                  <h3>{event.name}</h3>
                  <ul className='p-0'>
                      <li className='col-sm-12 text-start'>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className='text-primary mx-2'/>
                          {event.venue}
                      </li>
                      <li className='col-sm-12 text-start'>
                      <FontAwesomeIcon icon={faCalendarAlt} className='text-primary mx-2'/>
                          {event.date}
                      </li>
                      <li className='col-sm-12 text-start'>
                      <FontAwesomeIcon icon={faClock} className='text-primary mx-2'/>
                          {event.time}
                      </li>
                  </ul>
                  <button className='btn btn-primary btn-lg'>
                      K 5000
                      <FontAwesomeIcon icon={faTicket}/>
                  </button>
              </div>
            </div>
          </Link>
        ))}
      </OwlCarousel>
    }
    </div>
  );
};

export default Events;
