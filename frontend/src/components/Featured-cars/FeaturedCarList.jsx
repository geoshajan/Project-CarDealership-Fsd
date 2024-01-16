import React from "react";
import CarCard from "../../shared/CarCard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import carData from "../../assets/data/cars.js"

const FeaturedCarList = () => {
  const {
    data: featuredCars,
    loading,
    error,
  } = useFetch(`${BASE_URL}/cars/search/getFeaturedCars`);

  return (
    <>
      {loading && <h4>Loading..........</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredCars?.map((car) => (
          <Col lg="3" className="mb-4" key={car.id}>
            <CarCard car={car} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedCarList;
