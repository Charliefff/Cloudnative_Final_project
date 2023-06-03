const express = require('express');
const router = express.Router();

const History = require('../models/History');

// @route  GET api/histories
// @desc   Get all history
// @access Private

router.get('/', async (req, res) => {
  try {
    const histories = await History.find({ operation: 'Delete' }).sort({
      date: -1,
    });
    res.json(histories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
