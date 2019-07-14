const createReservation = (message) => {
    return { id: message.SmsMessageSid, name: message.Body };
};

module.exports = {createReservation};
