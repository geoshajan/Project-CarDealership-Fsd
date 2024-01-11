import React from "react";
import CarCard from "../../shared/CarCard";
import carDetails from "../../pages/CarDetails";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import carData from "../../assets/data/cars.js"

const FeaturedCarList = () => {
  // const {
  //   data: featuredcars,
  //   loading,
  //   error,
  // } = useFetch(`${BASE_URL}/cars/search/getFeaturedcars`);

  return (
    <>
      
        {carData?.map((car) => (
          <Col lg="3" className="mb-4" key={car.id}>
            <CarCard car={car} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedCarList;
