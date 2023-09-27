import { useState } from 'react';
import { Modal, Button}  from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';

import './css/error.css'

const ErrorComponent = (err) => {
    const history = useHistory();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        history.push('/')
        
    }
    const error = err.err;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modal-error">
          <Modal.Title>{error.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-error">
          <p>{error.message}</p>
          
          <Button variant="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2'/>
            Back
          </Button>
        </Modal.Body>
      </Modal>
    </>)
}
 
export default ErrorComponent;