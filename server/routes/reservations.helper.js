// check if the reservation sms format is in the format of "Name, Date (yyyy-mm-dd), Time (hh:mm)"
const validReservationRequest = (reservationMessage) => {
    const reservationInfo = reservationMessage.split(',').map(info => info.trim());
    //check if the 2nd input is a valid date
    const reservationDate = new Date(`${reservationInfo[1]}T${reservationInfo[2]}:00`);
    if (reservationDate == 'Invalid Date') {
        return false;
    }
    return true;
};

// check if the request time is between 1pm and 9pm (store opening between 1pm to 10pm, 1 hour of durations)
// const checkReservationTime = (time) => {

// };

// create a reservation data object
const createReservation = (message) => {
    return { id: message.SmsMessageSid,
             name: message.Body,
             phoneNumber: message.From };
};

module.exports = {createReservation, validReservationRequest};

