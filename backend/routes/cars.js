import express from "express";
import {
  createcar,
  deletecar,
  getAllcar,
  getFeaturedcar,
  getSinglecar,
  getcarBySearch,
  getcarCount,
  updatecar,
} from "./../controllers/carController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createcar);

router.put("/:id", verifyAdmin, updatecar);

router.delete("/:id", verifyAdmin, deletecar);

router.get("/:id", getSinglecar);

router.get("/", getAllcar);

router.get("/search/getcarBySearch", getcarBySearch);

router.get("/search/getFeaturedcars", getFeaturedcar);

router.get("/search/getcarCount", getcarCount);

export default router;
