import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CommonSection from "../shared/CommonSection";
import { Col, Container, Row } from "reactstrap";
import carCard from "../shared/CarCard";
import Newsletter from "../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title={"car Search Result"} />
      <section>
        <Container>
          <Row>
            {data.length == 0 ? (
              <h4 className="text-center">No car found</h4>
            ) : (
              data?.map((car) => (
                <Col lg="3" className="mb-4" key={car._id}>
                  <carCard car={car} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
