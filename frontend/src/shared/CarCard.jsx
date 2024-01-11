import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import "./car-card.css";
import calculateAvgRating from "../utils/avgRatings";

const CarCard = ({ car }) => {
  const { _id, title, city, photo, price, featured, reviews } = car;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="car__card">
      <Card>
        <div className="car__img">
          <img src={photo} alt="car-img" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="car__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}
            </span>
            <span className="car__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i> {avgRating == 0 ? null : avgRating}
              {totalRating == 0 ? "Not Rated" : <span>({reviews.length})</span>}
            </span>
          </div>
          <h5 className="car__title">
            <Link to={`/cars/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span>/per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/cars/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CarCard;
