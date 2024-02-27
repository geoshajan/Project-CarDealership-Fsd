import express from "express";
import {
  createCar,
  deleteCar,
  getAllCar,
  getFeaturedCar,
  getSingleCar,
  getCarBySearch,
  getCarCount,
  updateCar,
} from "../controllers/carController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyAdmin, createCar);

router.put("/update/:id", verifyAdmin, updateCar);

router.delete("/:id", verifyAdmin, deleteCar);

router.get("/:id", getSingleCar);

router.get("/", getAllCar);

router.get("/search/getCarBySearch", getCarBySearch);

router.get("/search/getFeaturedCars", getFeaturedCar);

router.get("/search/getCarCount", getCarCount);

export default router;
