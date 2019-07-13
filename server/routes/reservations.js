var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');
  res.json([
    { id: 1, name: "Eli Ferdinand, party of 2 @ 8pm" },
    { id: 2, name: "Cecilija Frantzisko, party of 5 @ 3pm" }
  ]);
});

module.exports = router;
