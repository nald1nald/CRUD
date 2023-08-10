const customerModel = require("../models/customerModel");

// Create
exports.createCustomer = async (req, res) => {
  console.log(req.body);
  const data = new customerModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
};

// Read
exports.readCustomer = async (req, res) => {
  const data = await customerModel.find({});
  res.json({ success: true, data: data });
};

// Update
exports.updateCustomer = async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);

  const data = await customerModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated!", data: data });
};

// Delete
exports.deleteCustomer = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const data = await customerModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
};
