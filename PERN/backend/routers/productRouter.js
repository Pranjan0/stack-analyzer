const express = require('express');

const router = express.Router();
const { addProduct, getAllProduct, deleteProduct } = require('./product_queries');

router.post('/add', (req, res) => {
  console.log(req.body);
  addProduct(req.body, res);

});

router.get('/getall', (req, res) => {
  getAllProduct(res);
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
  deleteProduct(req.params.id, res);
});

module.exports = router;
