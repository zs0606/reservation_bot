const {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation
} = require("./../routes/reservations.helper");

const mockMessage = "John 9-15 4pm";

const futureRequest = {
  ToCountry: "US",
  ToState: "NY",
  SmsMessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  NumMedia: "0",
  ToCity: "",
  FromZip: "10003",
  SmsSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  FromState: "NY",
  SmsStatus: "received",
  FromCity: "NEW YORK",
  Body: "John 09-25 4pm",
  FromCountry: "US",
  To: "+23123052583",
  ToZip: "",
  NumSegments: "1",
  MessageSid: "vafZaeY2MkItg0rcSYSwB6O6lEtOUMTDuT",
  AccountSid: "QmXxjiKhe8RxJwzohdMYxzezO7xA0ndGsP",
  From: "+42605842845",
  ApiVersion: "2010-04-01"
};

test("sms message is parsed by parseRequestBody", () => {
  expect(parseRequestBody("John 9-15 4pm")).toStrictEqual([
    "John",
    "9-15",
    "4pm"
  ]);
});

test.todo("validate parseDateTime");
