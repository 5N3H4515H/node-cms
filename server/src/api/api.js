const express = require('express');
const dynamicSchema = require('../schema/schema');

const router = express.Router()

const clientFields = [{ fieldName: 'name', fieldType: String },
{ fieldName: 'age', fieldType: Number }];

const customFields = [{ fieldName: 'gender', fieldType: String },
{ fieldName: 'smallPeePee', fieldType: Boolean }];

//Post Method
router.post('/create/:tableName', async(req, res) => {
    const { tableName } = req.params;
    console.log(req.body.data);
    const DynamicModel = dynamicSchema.createOrUpdateSchema(clientFields, tableName);

    try {
        console.log(req.body);
        const data = new DynamicModel(req.body);
        const savedData = await data.save();
        res.status(201).json(savedData);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/:tableName', async(req, res) => {
    const { tableName } = req.params;
    const DynamicModel = dynamicSchema.createOrUpdateSchema([], tableName);

    try {
        const allData = await DynamicModel.find();
        res.status(200).json(allData);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;