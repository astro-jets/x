// Components
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from 'react-bootstrap/Modal';
import BlogSlider from './components/BlogSlider';
import Events from './components/Events';
import Loader from './components/Loader';
import Slider from './components/SmallMusicSlider';
import useFetch from './hooks/useFetch';
import  './components/css/home.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faClose} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Home = () => {
    const [signUpPopUp,setSignupPopUp] = useState(true)

    const {data: musicData,isLoading,error} = useFetch('http://localhost:4000/admin/getPlaylist/Rap'); 
    console.log(musicData)
    
    return ( 
        <div className="">
            {error && <p className='text-primary'>{error}</p>}
            <BlogSlider />
            {isLoading ? <Loader/> : (musicData && <Slider music={musicData}/>)}
            {signUpPopUp &&
                <Modal.Dialog >
                    <Modal.Body className="modal-info">
                        <div className="col-12 text-end" onClick={()=>{setSignupPopUp(!signUpPopUp)}}>
                            <FontAwesomeIcon icon={faClose} className='text-primary'/>
                        </div>
                        <section className="sign-up-section col-12  mb-2 flex ac jc f-col">
                            <h3 className="text-center text-primary ">Get In!</h3>
                            <div className="col-8 flex ac jc f-col ">
                                <img src="images/music file2-09.svg" alt="" />
                            </div>
                            <p className="col-12 text-light justify">
                                Get the latest hits, exclusive gossip, and fresh vibes. 
                                Join us today for free.
                            </p>
                            <div className="col-12 text-center">
                                <button className="btn btn-primary text-light col-11">Sign Up</button>
                            </div>
                        </section>
                    </Modal.Body>
                </Modal.Dialog>
            }
            
            <Events/>
            {signUpPopUp &&
                <Modal.Dialog animation={true} className='col-10 mt-4'>
                    <Modal.Body className="modal-info">
                        <div className="col-12 text-end" onClick={()=>{setSignupPopUp(!signUpPopUp)}}>
                            <FontAwesomeIcon icon={faClose} className='text-primary'/>
                        </div>
                        <section className="sign-up-section flex ac jc f-col col-12">
                            <h3 className="text-center text-primary flex f-col ac jc">Stay Connected</h3>
                            <div className="col-8 flex ac jc">
                                <img src="images/undraw_influencer_re_1fkb.svg" className="col-10" alt="" />
                            </div>

                            <div className="col-12 flex ac jc">
                                <p className="col-11 text-light justify">
                                    Join us on your favorite social media platforms. 
                                    Link up now and let'signite the music together!
                                </p>
                            </div>
                            <div className="col-12 text-center">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                    <a href="#">
                                    <FontAwesomeIcon icon={faFacebook} className="text-light fa-2x mx-1"/>
                                    </a>
                                    </li>
                                    <li className="list-inline-item">
                                    <a href="#"><FontAwesomeIcon icon={faXTwitter} className="text-light fa-2x mx-1"/></a>
                                    </li>
                                    <li className="list-inline-item">
                                    <a href="#"><FontAwesomeIcon icon={faInstagram} className="text-light fa-2x mx-1"/></a>
                                    </li>
                                    <li className="list-inline-item">
                                    <a href="#"><FontAwesomeIcon icon={faYoutube} className="text-light fa-2x mx-1"/></a>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </Modal.Body>
                </Modal.Dialog>
            }
            
        </div>
        
     );
}
 
export default Home;