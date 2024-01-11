import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import carRoute from "./routes/cars.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.get("/", (req, res) => {
  res.send("API is working");
});

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database connected");
  } catch (err) {
    console.error("MongoDB database connection failed:", err);
    throw new Error("Unable to connect to the database");
  }
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cars", carRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
});
