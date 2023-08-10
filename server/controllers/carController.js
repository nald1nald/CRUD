const carModel = require("../models/carModel");

// Create

exports.createCarRecord = async (req, res) => {
  try {
    const customer_id = req.params.customer_id;
    const carData = req.body;
    carData.customer = customer_id;
    const car = new carModel(carData);

    await car.save();

    res.status(201).json({
      success: true,
      message: "Car record(s) created successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating car record",
      error: error.message,
    });
  }
};

// Read

exports.readCarRecord = async (req, res) => {
  try {
    const { customer_id } = req.params;

    const cars = await carModel.find({ customer: customer_id });

    res.json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching car records",
      error: error.message,
    });
  }
};

// Update

exports.updateCarRecord = async (req, res) => {
  try {
    const { car_id } = req.params;
    const updatedCarData = req.body;

    const updatedCar = await carModel.findByIdAndUpdate(
      car_id,
      updatedCarData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Car record updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating car record",
      error: error.message,
    });
  }
};

// Delete

exports.deleteCarRecord = async (req, res) => {
  try {
    const { car_id } = req.params;

    await carModel.findByIdAndDelete(car_id);

    res.json({ success: true, message: "Car record deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting car record",
      error: error.message,
    });
  }
};
