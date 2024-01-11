import car from "../models/car.js";

export const createcar = async (req, res) => {
  const newcar = new car(req.body);

  try {
    const savedcar = await newcar.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedcar,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create.Try again" });
  }
};

export const updatecar = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedcar = await car.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedcar,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

export const deletecar = async (req, res) => {
  const id = req.params.id;

  try {
    await car.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

export const getSinglecar = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await car.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: car,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const getAllcar = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const cars = await car.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: cars.length,
      message: "Successful",
      data: cars,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getcarBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const cars = await car.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      count: cars.length,
      message: "Successful",
      data: cars,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getFeaturedcar = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const cars = await car.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,

      message: "Successful",
      data: cars,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getcarCount = async (req, res) => {
  try {
    const carCount = await car.estimatedDocumentCount();

    res.status(200).json({ success: true, data: carCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
