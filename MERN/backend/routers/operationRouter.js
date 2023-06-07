const express = require('express');

const router = express.Router();
const Model = require('../models/operationModel');
const { addOpData } = require('./operationController');

router.post('/add', (req, res) => {
  addOpData(req.body)
    .then((result) => {
      console.log('Operation Data Saved');
      res.status(201).json({ status: 'success', result });
    })
    .catch((err) => {
      console.error('Error saving operation data', err);
      res.status(500).send('Error saving operation data');
    });
});


router.get('/getall', (req, res) => {
  Model.find()
    .then((result) => {
      console.log('User Data Retrieved');
      res.status(200).json({ status: 'success', result });
    })
    .catch((err) => {
      console.error('Error retrieving user data', err);
      res.status(500).send('Error retrieving user data');
    });
});

router.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      console.log('User Data Retrieved');
      res.status(200).json({ status: 'success', result });
    })
    .catch((err) => {
      console.error('Error retrieving user data', err);
      res.status(500).send('Error retrieving user data');
    });
});

router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      console.log('User Data Updated');
      res.status(200).json({ status: 'success', result });
    })
    .catch((err) => {
      console.error('Error updating user data', err);
      res.status(500).send('Error updating user data');
    });
});

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log('User Data Deleted');
      res.status(200).json({ status: 'success', result });
    })
    .catch((err) => {
      console.error('Error deleting user data', err);
      res.status(500).send('Error deleting user data');
    });
});

module.exports = router;
