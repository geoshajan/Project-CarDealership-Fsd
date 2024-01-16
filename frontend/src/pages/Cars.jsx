import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/car.css";
import CarCard from "../shared/CarCard";
import SearchBar from "../shared/SearchBar";
import { Col, Container, Row } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Cars = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: cars,
    loading,
    error,
  } = useFetch(`${BASE_URL}/cars?page=${page}`);
  const { data: carCount } = useFetch(`${BASE_URL}/cars/search/getcarCount`);

  useEffect(() => {
    const pages = Math.ceil(carCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, carCount, cars]);

  return (
    <>
      <CommonSection title={"All Cars"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {cars?.map((car) => (
                <Col lg="3" className="mb-4" key={car._id}>
                  <CarCard car={car} />
                </Col>
              ))}

              <Col lg="12">
                <div
                  className="pagination d-flex align-items-center
            justify-content-center mt-4 gap-3"
                >
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page == number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      
    </>
  );
};

export default Cars;
