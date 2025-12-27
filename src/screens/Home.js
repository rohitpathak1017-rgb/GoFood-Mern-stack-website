import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useEffect, useState } from 'react'

export default function Home() {
  const [search,setSearch]=useState('');

   
  const [foodCat,setFoodcat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);

  const loadData=async()=>{ 
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    });
    response=await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodcat(response[1]);
  }
  useEffect(()=>{
    loadData()
  },[]) 


  return (
  <div>
    <Navbar />
    <div><div
      id="carouselExampleInterval"
      className="carousel slide position-relative"
      data-bs-ride="carousel"
    >

      {/* 🔍 Search bar overlay */}
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: 10, width: '50%', height: '95%' }}
      >
        <div className="d-flex justify-content-center align-items-center h-100">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search food..."
            aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </div>
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

    </div></div>

    <div className="container mt-4">
      {foodCat.length !== 0 ? (
        foodCat.map((cat) => (
          <div key={cat._id} className="mb-4">
            <h3 className="text-success">{cat.CategoryName}</h3>
            <hr />

            <div className="row g-3">
              
              {foodItem
                .filter(item => item.CategoryName === cat.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map(item => (
                  <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Card
                      foodItem={item}
                       options={item.options}
                      imgsrc={item.img}
                     
                    />
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>

    <Footer />
  </div>
);

}

