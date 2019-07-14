var express = require('express');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {reservationInfo, validReservationRequest, createReservation} = require('./reservations.helper');
const database = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(database);
});

/* POST user request reservation through message and create new reservation*/
router.post('/sms', (req, res, next) => {
  const twiml = new MessagingResponse();
  const newReservationInfo = reservationInfo(req.body.Body);
  if (validReservationRequest(newReservationInfo)) {
    twiml.message('Your reservation was successful');
    const newReservation = createReservation(req.body, newReservationInfo);
    database.push(newReservation);
  } else {
    twiml.message('Your reservation was invalid, please request with "Name, Date (yyyy-mm-dd), Time (hh:mm) in 12 hours standard time", starting from today from 1pm to 9pm');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router;
