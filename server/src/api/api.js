const express = require("express");
const dynamicSchema = require("../schema/schema");
const { default: mongoose } = require("mongoose");

const router = express.Router();

//Create a table with fields
router.post("/create", async (req, res) => {
  const { tableName, fields } = req.body;
  try {
    dynamicSchema.createOrUpdateSchema(fields, tableName);
    res.status(201).json({ message: "Collection Created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Insert data in a table
router.post("/insert/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const fields = Object.keys(req.body).map((fieldName) => ({
    fieldName,
    fieldType: req.body[fieldName],
  }));
  const DynamicModel = dynamicSchema.createOrUpdateSchema(fields, tableName);
  try {
    const data = new DynamicModel(req.body);
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all data of a specific table
router.get("/get/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const DynamicModel = dynamicSchema.createOrUpdateSchema([], tableName);
  try {
    const allData = await DynamicModel.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get table data by ID
router.get("/getById/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const DynamicModel = dynamicSchema.createOrUpdateSchema([], tableName);
  try {
    const data = await DynamicModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update table data by ID
router.patch("/update/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const fields = Object.keys(req.body).map((fieldName) => ({
    fieldName,
    fieldType: req.body[fieldName],
  }));
  const DynamicModel = dynamicSchema.createOrUpdateSchema(fields, tableName);
  try {
    const data = await DynamicModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete table data by ID
router.delete("/delete/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const DynamicModel = dynamicSchema.createOrUpdateSchema([], tableName);
  try {
    await DynamicModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Data Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete a table
router.delete("/delete/:tableName/", async (req, res) => {
  const { tableName } = req.params;
  const DynamicModel = dynamicSchema.createOrUpdateSchema([], tableName);
  const tableToDelete = DynamicModel.collection;
  tableToDelete.drop((error) => {
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({ message: "Collection Dropped successfully" });
    }
  });
});

module.exports = router;
