const {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation
} = require("./../routes/reservations.helper");

const mockMessage = "John 9-15 4pm";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

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

test("test parseDateTime pass", () => {
  expect(parseDateTime(["John", "9-15", "4pm"])).toStrictEqual(
    new Date(currentYear, 8, 15, 16)
  );
});

test("test parseDateTime fail non-array", () => {
  expect(parseDateTime(null)).toBe("Invalid Date");
});

test("test parseDateTime fail array", () => {
  expect(parseDateTime(["1", "2", "3", "4"]).valueOf()).toBeNaN();
});

test.todo("validateReservation true");
test.todo("validateReservation false Invalid Date");
test.todo("validateReservation false past date");

test.todo("validateReservation false outside open hours");
test.todo("reservationMaker return reservationObject");
test.todo("reservationMaker return null");
// test.todo("");
// test.todo("");
// test.todo("");
