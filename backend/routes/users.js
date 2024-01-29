import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

import { verifyUser } from "../utils/verifyToken.js";

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", getSingleUser);

router.get("/",  getAllUser);

export default router;
