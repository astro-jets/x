import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from './hooks/useFetch';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faCalendarAlt, faClock, faDownload, faMapMarkerAlt, faTicket} from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

import './components/css/Events.css'

const Event = () => {
    const {id} = useParams();
    const [qr,setQr] = useState({});
    const [show, setShow] = useState(true);
    const [ticket, setTicket] = useState("");
    const {data: event,isLoading,error} = useFetch(`https:/studiox.onrender.com/api/events/${id}`); 

    const combineImages = (qrCodeImage, flyerImage, eventInfo) => {
        let combinedImageURL = "";
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions and background color
        canvas.width = 800; // Adjust the width and height as needed
        canvas.height = 400;
        // Create a linear gradient background
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#000'); // Start color (black)
        gradient.addColorStop(1, '#444');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the flyer image on the left
        const flyer = new Image();
        flyer.src = flyerImage;
        flyer.onload = () => {
            context.drawImage(flyer, 20, 50, 300, 300); // Adjust the positioning and size

            // Draw the QR code image on the right
            const qrCode = new Image();
            qrCode.src = qrCodeImage;
            qrCode.onload = () => {
            context.drawImage(qrCode, 450, 50, 300, 300); // Adjust the positioning and size

            // Add labels and text
            context.fillStyle = 'white'; // Label and text color
            context.font = '24px Arial';

            // Event Name (Top Center)
            context.textAlign = 'center';
            context.fillText(event.name, canvas.width / 2, 30); // Adjust the vertical position

            // Ticket Number (Center)
            context.textAlign = 'center';
            context.fillText(`Ticket# ${event.tickets}`, canvas.width  - (canvas.width - 80), canvas.height - 20);

            // Studio X (Bottom Right)
            context.textAlign = 'right';
            context.fillText('Studio X', canvas.width - 20, canvas.height - 20);

            // Red Bottom Border
            context.fillStyle = 'red'; // Red color for the bottom border
            context.fillRect(0, canvas.height - 5, canvas.width, 5); // Adjust the height and color
            context.fillStyle = 'black'; // Reset the fill color to black

            // You can now provide options to the user to download the combined image
            // For example, you can convert the canvas to a data URL and create a download link
            combinedImageURL = canvas.toDataURL('image/png');
            setTicket(combinedImageURL);
            };
        };

        return context;
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = ticket;
        link.download = `${event.name} Ticket.png`
        link.click();
    };

    const handleClose = () => {
        setShow(false);
        handleDownload();

    };    
    
    const purchaseTicket = async ()=>{
        fetch(`https://studiox.onrender.com/api/ticket/${id}`)
        .then(res=>{if (!res.ok) {
            throw Error('Failed to fetch data');}
            return(res.json());
        })
        .then(data=>{
            setQr(data);
        })
        .catch (err => {
            if(err.name === "AbortError"){console.log("Fetch Aborted")}
            else{
                console.log(err.message)
            }
        })
    };

    qr.qrCode ? combineImages(qr.qrCode,event.poster): <></>;

    return ( 
        <div className="mt-5 pt-1">
            <h1 className="text-center text-primary text-lg mt-5">{event.name}</h1>
            {qr.qrCode ?
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header className="bg-dark">
                        <Modal.Title>Purchase Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark">
                        <p>Download your ticket.</p>
                        <img className='event-ticket' src={qr.qrCode} alt="" />
                        <Button variant="primary" className='text-center mt-3 col-12' onClick={handleClose}>
                            <FontAwesomeIcon icon={faDownload} className='mx-2'/>
                            Download
                        </Button>
                        </Modal.Body>
                    </Modal>
                </> : ""
            }
            <img src={event.poster} className="col-12 event-poster" alt="" />
            <section className="sign-up-section col-12 mt-3 mb-2 p-0">
                <div className="container">
                    <div className="col-12 text-center mb-2">
                    </div>
                    <div className="col-12 flex ac jc f-col">
                        <div className="row">
                            <div className="col-4 text-center">
                                <FontAwesomeIcon className="text-primary mx-2" icon={faCalendarAlt}/>
                                <p>{event.date}</p>
                            </div>
                            <div className="col-4 text-center">
                                <FontAwesomeIcon className="text-primary mx-2" icon={faClock}/>
                                <p>{event.time}</p>
                            </div>
                            <div className="col-4 text-center">
                                <FontAwesomeIcon className="text-primary mx-2" icon={faMapMarkerAlt}/>
                                <p>{event.venue}</p>
                            </div>
                        </div>
                        <p className="col-12 text-justify text-light">
                            {event.name} is going to take place at the {event.venue} on {event.date}. Tickets costs K30,000.
                        </p>
                        <div className="col-12 mt-3 text-center font-lg">
                            <h3><FontAwesomeIcon className="text-primary mx-2 fa-1x" icon={faTicket}/> Tickets left: {event.tickets}</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sign-up-section col-12 mb-2">
            <div className="container">
                <div className="col-md-6">
                <div className="card bg-secondary">
                    <form className="form-horizontal">
                    <div className="card-body">
                        <h3 className="text-center text-light">PAYMENT DETAILS</h3>
                        <div className="line my-3 col-12"></div>
                        <div className="form-group row">
                        <label
                            for="fname"
                            className="col-sm-12 text-start text-light text-end control-label col-form-label"
                            >Full Name</label
                        >
                        <div className="col-sm-9">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name "
                            />
                        </div>
                        </div>
                        <div className="form-group row">
                        <label
                            for="lname"
                            className="col-sm-12 text-start text-light text-end control-label col-form-label"
                        >
                            Phone Number
                        </label>
                        <div className="col-sm-9">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            />
                        </div>
                        </div>
                        <div className="form-group row">
                        <label
                            for="lname"
                            className="col-sm-12 text-start text-light text-end control-label col-form-label"
                            >Card Number</label
                        >
                        <div className="col-sm-9">
                            <input
                            type="password"
                            className="form-control"
                            id="lname"
                            placeholder="Card Number"
                            maxlength="8"
                            />
                        </div>
                        </div>
                        <div className="form-group row">
                        <label
                            for="email1"
                            className="col-sm-12 text-start text-light text-end control-label col-form-label"
                            >CVV</label
                        >
                        <div className="col-sm-9">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="CVV "
                            maxlength="3"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <button className="btn btn-primary text-light col-11" type='button' onClick={purchaseTicket}>
                        Buy Ticket
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </section>
        </div>
    );
}
 
export default Event;