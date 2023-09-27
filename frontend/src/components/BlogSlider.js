const BlogSlider = () => {
    return (         
        <section className="top-section col-12 mb-2">
        <div
            id="carouselExampleCaptions"
            className="carousel dark slide"
            data-bs-ride="carousel"
        >
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="images/blog-1.jpg" className="d-block w-100" alt="" />
                <div className="carousel-caption col-sm-12 d-md-block">
                <h5>Meet Dkez Walker</h5>
                <p className="text-start">
                    Some representative placeholder content for the third slide...
                </p>
                </div>
            </div>

            <div className="carousel-item">
                <img src="music/dob.png" className="d-block w-100" alt="" />
                <a href="blogsingle.html" className="carousel-caption col-sm-12 d-md-block">
                <h5>Sagonja's new album</h5>
                <p className="text-start text-sm">
                    The Blantyre based rapper has released his new album called....
                </p>
                </a>
            </div>

            <div className="carousel-item">
                <img src="images/blog-3.jpg" className="d-block w-100" alt="" />
                <div className="carousel-caption col-sm-12 d-md-block">
                <h5>Third slide label</h5>
                <p className="text-start">
                    Some representative placeholder content for the third slide.
                </p>
                </div>
            </div>
            </div>

            <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
            >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
            >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
        </section>
     );
}
 
export default BlogSlider;