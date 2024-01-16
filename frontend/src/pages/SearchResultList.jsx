import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CommonSection from "../shared/CommonSection";
import { Col, Container, Row } from "reactstrap";
import CarCard from "../shared/CarCard";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title={"Car Search Result"} />
      <section>
        <Container>
          <Row>
            {data.length == 0 ? (
              <h4 className="text-center">No car found</h4>
            ) : (
              data?.map((car) => (
                <Col lg="3" className="mb-4" key={car._id}>
                  <CarCard car={car} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;
