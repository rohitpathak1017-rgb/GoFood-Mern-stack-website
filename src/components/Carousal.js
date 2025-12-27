import React from 'react'

export default function Carousal() {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
    >

      {/* 🔍 Search bar overlay */}
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: 10, width: '50%', height: '95%' }}
      >
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search food..."
            aria-label="Search"
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Carousel images */}
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
            className="d-block w-100"
            alt="food"
          />
        </div>

        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
            className="d-block w-100"
            alt="food"
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg"
            className="d-block w-100"
            alt="food"
          />
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  )
}


