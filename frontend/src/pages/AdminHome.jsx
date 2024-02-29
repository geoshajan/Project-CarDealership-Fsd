import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import Card from "../components/Card";
import "../pages/adminhome.css";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${BASE_URL}/users/`, {
          method: "GET",
          credentials: "include",
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          const count = userData.count;
          console.log(count);
          setUserCount(count || 0);
        } else {
          console.error("Error fetching user count:", userResponse.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      try {
        const carResponse = await fetch(
          `${BASE_URL}/cars/search/getCarCount`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (carResponse.ok) {
          const carCountData = await carResponse.json();

          const count =
            carCountData && carCountData.data ? carCountData.data : 0;

          setCarCount(count);
        } else {
          console.error("Error fetching car count:", carResponse.status);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
      try {
        const userResponse = await fetch(`${BASE_URL}/booking/`, {
          method: "GET",
          credentials: "include",
        });
        if (userResponse.ok) {
          const bookings = await userResponse.json();
          const count = bookings.count;
          console.log(count);
          setBookingCount(count || 0);
        } else {
          console.error("Error fetching user count:", userResponse.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-home">
      <h1 className="admin-home-title">Admin Dashboard</h1>
      <div className="container-card">
        <Card title="Users" count={userCount} />
        <Card title="Cars" count={carCount} />
        <Card title="Bookings" count={bookingCount} />
      </div>
    </div>
  );
};

export default AdminHome;
