var express = require("express");
var router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { reservationMaker } = require("./reservations.helper");
const database = [];

/* GET users listing. */
router.get("/", function(req, res, next) {
  // res.send('respond with a resource');
  res.json(database);
});

/* POST user request reservation through message and create new reservation*/
router.post("/sms", (req, res, next) => {
  const twiml = new MessagingResponse();
  // console.log(req.body);
  // const newReservationInfo = reservationInfo(req.body.Body);
  // reservationMaker(req.body);
  const reservation = reservationMaker(req.body);
  if (reservation) {
    // const newReservation = createReservation(req.body, newReservationInfo);
    database.push(reservation);
    twiml.message("Your reservation was successful");
  } else {
    twiml.message(
      'Your reservation was invalid, please request with "Name Date [mm-dd] Time [hh]", between 1pm and 9pm'
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = router;
