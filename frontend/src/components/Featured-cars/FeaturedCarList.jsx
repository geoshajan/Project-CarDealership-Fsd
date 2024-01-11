import React from "react";
import CarCard from "../../shared/CarCard";
import carDetails from "../../pages/CarDetails";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedCarList = () => {
  const {
    data: featuredcars,
    loading,
    error,
  } = useFetch(`${BASE_URL}/cars/search/getFeaturedcars`);

  return (
    <>
      {loading && <h4>Loading..........</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredcars?.map((car) => (
          <Col lg="3" className="mb-4" key={car.id}>
            <carCard car={car} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedCarList;
