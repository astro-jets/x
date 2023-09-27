// QRCodeScanner.js
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import Modal from 'react-bootstrap/Modal';


function QRCodeScanner() {
  const [qrCodeData, setQRCodeData] = useState('');
  const [msg, setMsg] = useState('');

  const handleScan = (data) => {
    if (data) {
      // Ensure the QR code data is a string
      const qrDataString = JSON.stringify(data);
      setQRCodeData(JSON.stringify(data))
      
      fetch('http://localhost:4000/validateTicket/', { 
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({qrCodeData:qrDataString}),
        } )
        .then(res=>{
            if (!res.ok) {throw Error('Failed to fetch data');}
            return(res.json());
        })
        .then(data=>{
            setMsg(data.msg)
        })
        .catch (err => {
            if(err.name === "AbortError"){console.log("Fetch Aborted")}
            else{
                console.log(err.message)
            }
        })
    }
  };

  const handleError = (error) => {
    console.error(error);
    // Handle camera errors if needed
  };


return (
  <div>
    <h1>QR Code Scanner</h1>
    {msg ? (
      <Modal.Dialog>
        <Modal.Header closeButton onClick={()=>{setMsg('')}}>
          
        </Modal.Header>

        <Modal.Body>
          <h1 className='text-dark text-center'>{msg}</h1>
        </Modal.Body>
      </Modal.Dialog>
    ) : (
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    )}
  </div>
);

}

export default QRCodeScanner;
