// check if the reservation sms format is in the format of "Name, Date (yyyy-mm-dd), Time (hh:mm)"
const reservationInfo = (reservationMessage) => {
    const reservationInfoArray = reservationMessage.split(',').map(info => info.trim());
    return reservationInfoArray;
};

const makeDate = (date, time) => {
    const reservationDate = new Date(`${date}T${time}:00`);
    return reservationDate;
};

const validReservationRequest = (reservationInfoArr) => {
    if (reservationInfoArr.length !== 3) {
        //check if the reservationInfoArr has 3 elements
        return false;
    }

    const reservationDate = makeDate(reservationInfoArr[1], reservationInfoArr[2]);
    const currentDate = new Date();
    if (reservationDate == 'Invalid Date') {
        //check if the 2nd input is a valid date
        return false;
    } else if (reservationDate < currentDate) {
        //check if the reservation date and time pasted today
        return false;
    } else if (reservationDate.getHours() < 1 || reservationDate.getHours() >= 9) {
        //check if the request time is between 1pm and 9pm (store opening between 1pm to 10pm, 1 hour of durations)
        return false;
    }
    return true;
};

// create a reservation data object
const createReservation = (msg, reservationInfoArr) => {
    const reservationDate = makeDate(reservationInfoArr[1], reservationInfoArr[2]);
    return { id: msg.SmsMessageSid,
             name: reservationInfoArr[0],
             dateTime: reservationDate,
             phoneNumber: msg.From,
             rawMessage: msg.Body };
};

module.exports = {createReservation, validReservationRequest, reservationInfo};

