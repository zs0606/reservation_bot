var express = require('express');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {createReservation} = require('./reservations.helper');
const database = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json(database);
});

/* POST user request reservation through message and create new reservation*/
router.post('/sms', (req, res) => {
const newReservation = createReservation(req.body);
database.push(newReservation);
const twiml = new MessagingResponse();
  twiml.message('Your reservation was successful');

  res.writeHead(200, { 'Content-Type': 'text/xml' });


  res.end(twiml.toString());
});

module.exports = router;
