const mongoose = require("mongoose");

const dynamicSchema = new mongoose.Schema({});

// Function to create or update the dynamic schema
const createOrUpdateSchema = (fields, tableName) => {
  const dynamicSchemaDefinition = {};

  // Add fields to the dynamic schema definition
  fields.forEach((field) => {
    const { fieldName, fieldType } = field;
    dynamicSchemaDefinition[fieldName] = {
      type: typeof fieldType || String, // Set a default type if not provided
    };
  });

  // Set the dynamic schema definition
  dynamicSchema.add(dynamicSchemaDefinition);

  // Create or update the model with the dynamic schema
  return mongoose.model(tableName, dynamicSchema);
};

module.exports = {
  createOrUpdateSchema,
};
