import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedCarList from "../components/Featured-cars/FeaturedCarList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Subtitle from '../shared/Subtitle';

const Home = () => {
  const items = [
    {
      src: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960',
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
    },
    {
      src: 'https://thumbor.forbes.com/thumbor/fit-in/960x/filters:format(jpg)/https://www.forbes.com/wheels/wp-content/uploads/2020/12/Nissan-zproto-400z-960x540-1.png',
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
    },
    {
      src: 'https://www.kia.com/content/dam/kwcms/au/en/images/category/performance/media-banner-960x540.webp',
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
    },
  ];

  const Example = (args) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.src}
    >
      <img src={item.src} alt={item.altText} />
      <CarouselCaption
        captionText={item.caption}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <Container className="carousel-container">
      <Row>
        <Col lg="12" className="d-flex justify-content-center">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

  return (
    <>
     {/* Carousel Section */}
      <Example />

      {/* SearchBar Section */}
      <div className="search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <SearchBar />
      </div>


        {/* <SearchBar /> */}


      {/* Rest of your component code */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*=========featured car section start==========*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__car-title">Our featured cars</h2>
            </Col>
            <FeaturedCarList />
          </Row>
        </Container>
      </section>
      {/*=========featured car section end==========*/}
      {/*=========experience section start===========*/}

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br />
                  we will serve you
                </h2>
                <p>sharing experience ....in your way</p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successfull sales</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>15+</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src="https://img.freepik.com/free-photo/portrait-successful-young-happy-man-showing-keys-sitting-new-car_186202-3895.jpg?size=626&ext=jpg&uid=R133885418&ga=GA1.2.2038340209.1704984276&semt=ais" alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/*=========experience section end===========*/}

      {/*=========gallery section start===========*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers car gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/*=========gallery section end===========*/}

      {/*=========testimonial section start===========*/}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/*=========testimonial section end===========*/}
    
    </>
  );
};

export default Home;
