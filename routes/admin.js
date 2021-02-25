var express = require('express');
var router = express.Router();

router.all('/', (req, res, next) => {
  res.status(401).json({
    payload: '🛑 You are not authorized to come here. Where are your credentials?',
    err: true
  })
})

module.exports = router;
