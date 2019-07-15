const {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation
} = require('./../routes/reservations.helper');

const mockMessage = 'John 9-15 4pm';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const futureRequest = {
  ToCountry: 'US',
  ToState: 'NY',
  SmsMessageSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  NumMedia: '0',
  ToCity: '',
  FromZip: '10003',
  SmsSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  FromState: 'NY',
  SmsStatus: 'received',
  FromCity: 'NEW YORK',
  Body: 'John 09-25 4pm',
  FromCountry: 'US',
  To: '+23123052583',
  ToZip: '',
  NumSegments: '1',
  MessageSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  AccountSid: 'QmXxjiKhe8RxJwzohdMYxzezO7xA0ndGsP',
  From: '+42605842845',
  ApiVersion: '2010-04-01'
};


const invalidRequest = {
  ToCountry: 'US',
  ToState: 'NY',
  SmsMessageSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  NumMedia: '0',
  ToCity: '',
  FromZip: '10003',
  SmsSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  FromState: 'NY',
  SmsStatus: 'received',
  FromCity: 'NEW YORK',
  Body: 'John 02-25 4pm',
  FromCountry: 'US',
  To: '+23123052583',
  ToZip: '',
  NumSegments: '1',
  MessageSid: 'vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT',
  AccountSid: 'QmXxjiKhe8RxJwzohdMYxzezO7xA0ndGsP',
  From: '+42605842845',
  ApiVersion: '2010-04-01'
};

const outsideOpenHoursReservationHour = 11; //11pm
const reservationDate = new Date(currentYear, 9, 17, outsideOpenHoursReservationHour + 12);

const expectedReservationObject = {
  id: Date.now(),
  name: 'John',
  dateTime: new Date(currentYear, 8, 25,  16),
  phoneNumber: '+42605842845',
  rawMessage: futureRequest,
  createdAt: new Date()
};

test('sms message is parsed by parseRequestBody', () => {
  expect(parseRequestBody('John 9-15 4pm')).toStrictEqual([
    'John',
    '9-15',
    '4pm'
  ]);
});

test('test parseDateTime pass', () => {
  expect(parseDateTime(['John', '9-15', '4pm'])).toStrictEqual(
    new Date(currentYear, 8, 15, 16)
  );
});

test.todo('test parseDateTime fail');
test.todo('validateReservation true');
test.todo('validateReservation false Invalid Date');
test.todo('validateReservation false past date');

test('validateReservation false outside open hours', () => {
  expect(validateReservation(reservationDate)).toBeFalsy();
});

test('reservationMaker return reservationObject', () => {
  const newReservation = reservationMaker(futureRequest);
  expect(newReservation.name).toBe(expectedReservationObject.name);
  expect(newReservation.dateTime).toStrictEqual(expectedReservationObject.dateTime);
  expect(newReservation.phoneNumber).toBe(expectedReservationObject.phoneNumber);
  expect(newReservation.rawMessage).toStrictEqual(expectedReservationObject.rawMessage);
});

test('reservationMaker return null', () => {
  expect(reservationMaker(invalidRequest)).toBeNull();
});
// test.todo("");
// test.todo("");
// test.todo("");
