var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(303).json({
    payload: "Try just `/9` without `/api`",
    err: true
  })
});

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: `Oops! ${req.method} method is is not allowed here`,
    err: true
  })
})

module.exports = router;
