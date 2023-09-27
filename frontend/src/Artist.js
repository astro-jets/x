import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './components/css/Artists.css'; // Import your custom CSS file

const ArtistsPage = () => {
  const artists = [
    {
      name: 'John Doe',
      genre: 'Pop/Rock',
      image: './images/blog-1.jpg',
    },
    {
      name: 'Jane Smith',
      genre: 'Indie/Folk',
      image: './images/blog-3.jpg',
    },
    // Add more artists as needed
  ];

  const owlCarouselOptions = {
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 2,
      },
    },
  };

  return (
    <div className="artists-page">
      <div className="">
          <div className="col-12">
            <h2 className="section-title">Featured Artists</h2>
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {artists.map((artist, index) => (
                <div key={index} className="artist-card flex f-col ac jc col-12">
                  <Image src={artist.image} alt={artist.name} className="artist-image" />
                  <div className="artist-info">
                    <h3 className="artist-name">{artist.name}</h3>
                    <p className="artist-genre">{artist.genre}</p>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
    </div>
  );
};

export default ArtistsPage;
