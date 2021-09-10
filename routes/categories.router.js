const express = require('express');
const router = express.Router();

const { categoryHandler } = require('./../handlers/categories.handler');

router.get('/status', (req, res, next) => {
  res.send({ status: 'Ok' });
});

router.get('/categories/:id', categoryHandler);
router.get('/categories', async (req, res) => {
  const id = req.query.id || null;
  let response = {};

  try {
    response = await categoryHandler(id);
    res.send(response);
  } catch (error) {
    response = {
      message: error.message,
      status: error.statusCode
    }

    res.status(error.statusCode).send(error.message);
  }
});

module.exports = router;
