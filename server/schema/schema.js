const mongoose = require('mongoose');

var schemaVersion = 1;

// Function to create or update the dynamic schema
const createOrUpdateSchema = (fields) => {
    const dynamicSchema = new mongoose.Schema({});
    const dynamicSchemaDefinition = {};

  // Add fields to the dynamic schema definition
  fields.forEach((field) => {
    const { fieldName, fieldType } = field;
    dynamicSchemaDefinition[fieldName] = {
      type: fieldType || String, // Set a default type if not provided
    };
  });

  // Set the dynamic schema definition
  dynamicSchema.add(dynamicSchemaDefinition);

  // Set the schema version
  dynamicSchema.set('version', schemaVersion);

  // Create or update the model with the dynamic schema
  return mongoose.model('DynamicData_V${schemaVersion}', dynamicSchema);
};

module.exports = {
  createOrUpdateSchema,
};
