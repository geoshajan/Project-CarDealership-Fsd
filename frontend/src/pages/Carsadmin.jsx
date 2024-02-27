import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./CarsAdmin.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Carsadmin = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [newCarData, setNewCarData] = useState({
    title: "",
    city: "",
    address: "",
    distance: 0,
    photo: "",
    desc: "",
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });

  const [editMode, setEditMode] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [editCarData, setEditCarData] = useState({
    id: null,
    title: "",
    city: "",
    address: "",
    distance: 0,
    photo: "",
    desc: "",
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cars?page=${page}`, {
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

    const fetchCarCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cars/search/getCarCount`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch car count");
        }
        const { data: carCount } = await response.json();
        const pages = Math.ceil(carCount / 8);
        setPageCount(pages);
      } catch (error) {
        console.error("Error fetching car count:", error);
      }
    };

    fetchCars();
    fetchCarCount();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete car");
      }

      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleAddCarClick = () => {
    setShowAddCarForm(true);
  };

  const handleEditClick = (car) => {
    setEditMode(true);
    setEditCarData({
      id: car._id,
      title: car.title,
      city: car.city,
      address: car.address,
      distance: car.distance,
      photo: car.photo,
      desc: car.desc,
      price: car.price,
      maxGroupSize: car.maxGroupSize,
      featured: car.featured,
    });
    setShowAddCarForm(true);
  };

  const handleAddCarChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (editMode) {
      setEditCarData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setNewCarData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const endpoint = editMode
        ? `${BASE_URL}/cars/update/${editCarData.id}`
        : `${BASE_URL}/cars/create`;
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editMode ? editCarData : newCarData),
      });

      if (!response.ok) {
        throw new Error(
          editMode ? "Failed to update car" : "Failed to add car"
        );
      }

      const result = await response.json();
      const updatedCar = result.data;

      if (editMode) {
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === updatedCar._id ? updatedCar : car
          )
        );
      } else {
        setCars((prevCars) => [...prevCars, updatedCar]);
      }

      setEditMode(false);
      setShowAddCarForm(false);
      setEditCarData({
        id: null,
        title: "",
        city: "",
        address: "",
        distance: 0,
        photo: "",
        desc: "",
        price: 0,
        maxGroupSize: 0,
        featured: false,
      });
      setNewCarData({
        title: "",
        city: "",
        address: "",
        distance: 0,
        photo: "",
        desc: "",
        price: 0,
        maxGroupSize: 0,
        featured: false,
      });
    } catch (error) {
      console.error(`Error ${editMode ? "updating" : "adding"} car:`, error);
    }
  };

  return (
    <div>
      <h1>Cars</h1>
      <Button variant="contained" color="primary" onClick={handleAddCarClick}>
        Add car
      </Button>
      {showAddCarForm && (
        <Form className="form-container" onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={editMode ? editCarData.title : newCarData.title}
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
              value={editMode ? editCarData.city : newCarData.city}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={editMode ? editCarData.address : newCarData.address}
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
              value={editMode ? editCarData.distance : newCarData.distance}
              onChange={handleAddCarChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo URL</Label>
            <Input
              type="text"
              name="photo"
              id="photo"
              placeholder="Enter photo URL"
              value={editMode ? editCarData.photo : newCarData.photo}
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
              value={editMode ? editCarData.desc : newCarData.desc}
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
              value={editMode ? editCarData.price : newCarData.price}
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
              value={
                editMode ? editCarData.maxGroupSize : newCarData.maxGroupSize
              }
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
                checked={
                  editMode ? editCarData.featured : newCarData.featured
                }
                onChange={handleAddCarChange}
              />
              Featured
            </Label>
          </FormGroup>
          <Button color="primary" type="submit">
            {editMode ? "Update" : "Save"}
          </Button>{" "}
          <Button color="secondary" onClick={() => setShowAddCarForm(false)}>
            Cancel
          </Button>
        </Form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="car-card-container">
            {cars.map((car) => (
              <div key={car._id} className="car-card">
                <img src={car.photo} alt="car-img" />
                <h2>{car.title}</h2>
                <h4>Rs.{car.price}</h4>
                <p>{car.address}</p>
                <p>{car.desc}</p>

                <div className="button-container">
                  <Button
                    color="danger"
                    variant="contained"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </Button>{" "}
                  <span className="spacer"></span>{" "}
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleEditClick(car)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {[...Array(pageCount).keys()].map((number) => (
              <span
                key={number}
                onClick={() => setPage(number)}
                className={page === number ? "active__page" : ""}
              >
                {number + 1}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carsadmin;
