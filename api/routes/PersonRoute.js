const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// get all persons
router.get('/', async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

// create a new person
router.post('/', async (req, res) => {
  const person = new Person({
    text: req.body.text
  });
  await person.save();
  res.json(person);
});

// delete a person
router.delete('/:id', async (req, res) => {
  const result = await Person.findByIdAndDelete(req.params.id);
  res.json({result});
});

// update a person
router.put('/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  person.text = req.body.text;
  await person.save();
  res.json(person);
});

module.exports = router;
