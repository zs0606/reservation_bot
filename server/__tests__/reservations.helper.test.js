const {
  reservationMaker,
  parseRequestBody,
  parseDateTime,
  validateReservation
} = require("./../routes/reservations.helper");

const mockMessage = "John 9-15 4pm";

test("sms message is parsed by parseRequestBody", () => {
  expect(parseRequestBody("John 9-15 4pm")).toStrictEqual([
    "John",
    "9-15",
    "4pm"
  ]);
});

test.todo("validate parseDateTime");
