// carsAdmin.jsx

import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./CarAdmin.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Carsadmin = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [newCarData, setNewCarData] = useState({
    title: "",
    transmission: "",
    city: "",
    // distance: 0,
    photo: "",
    desc: "",
    price: 0,
    // maxGroupSize: 0,
    featured: false,
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cars?page=0`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      // Filter out the deleted car from the state
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleAddCarClick = () => {
    setShowAddCarForm(true);
  };

  const handleAddCarChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCarData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCarSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/cars/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCarData),
      });

      if (!response.ok) {
        throw new Error("Failed to add car");
      }

      const result = await response.json();
      const addedCar = result.data;
      console.log("added car", addedCar);

      setCars((prevCars) => [...prevCars, addedCar]);
      setShowAddCarForm(false);
      // Reset the newcarData state
      setNewCarData({
        title: "",
        transmission: "",
        city: "",
        distance: 0,
        photo: "",
        desc: "",
        price: 0,
        maxGroupSize: 0,
        featured: false,
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div>
      <h1>Cars Admin</h1>
      <Button variant="contained" color="primary" onClick={handleAddCarClick}>
        Add car
      </Button>
      {showAddCarForm && (
        <Form onSubmit={handleAddCarSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={newCarData.title}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="transmission">Transmission</Label>
            <Input
              type="text"
              name="transmission"
              id="transmission"
              placeholder="Choose transmission"
              value={newCarData.transmission}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              value={newCarData.city}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Distance</Label>
            <Input
              type="number"
              name="distance"
              id="distance"
              placeholder="Enter distance"
              value={newCarData.distance}
              onChange={handleAddCarChange}
              required
            />
          // </FormGroup>
          <FormGroup>
            <Label for="photo">Photo URL</Label>
            <Input
              type="text"
              name="photo"
              id="photo"
              placeholder="Enter photo URL"
              value={newCarData.photo}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input
              type="textarea"
              name="desc"
              id="desc"
              placeholder="Enter description"
              value={newCarData.desc}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={newCarData.price}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Max Group Size</Label>
            <Input
              type="number"
              name="maxGroupSize"
              id="maxGroupSize"
              placeholder="Enter max group size"
              value={newCarData.maxGroupSize}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          {/* Featured field (assuming it's a boolean) */}
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="featured"
                name="featured"
                checked={newCarData.featured}
                onChange={handleAddCarChange}
              />
              Featured
            </Label>
          </FormGroup>
          <Button color="primary" type="submit">
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => setShowAddCarForm(false)}>
            Cancel
          </Button>
        </Form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="car-card-container">
          {cars.map((car) => (
            <div key={car._id} className="car-card">
              <img src={car.photo} alt="car-img" />
              <h2>{car.title}</h2>
              <h4>Rs.{car.price}</h4>
              <p>{car.address}</p>
              <p>{car.description}</p>
              <div className="button-container">
                <Button
                  color="danger"
                  variant="contained"
                  onClick={() => handleDelete(car._id)}
                >
                  Delete
                </Button>{" "}
                <span className="spacer"></span>{" "}
                <Button color="primary" variant="contained">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carsadmin;
