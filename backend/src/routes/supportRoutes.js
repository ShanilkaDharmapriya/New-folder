const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userId, type } = req.body;
  console.log(`📨 Support requested by ${userId} for ${type}`);
  res.status(200).json({ message: `Support request sent to ${type}` });
});

module.exports = router;
