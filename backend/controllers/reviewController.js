import Car from "../models/Car.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const carId = req.params.carId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();

    await Car.findByIdAndUpdate(carId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to submit" });
  }
};
