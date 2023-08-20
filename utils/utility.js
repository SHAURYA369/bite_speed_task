 function validateEmail(email) {
    if(email===null)
    return true;
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
}
function validatePhoneNumber(phoneNumber) {
    if(phoneNumber===null)
    return true;
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phoneNumber);
}
module.exports = {
    validateEmail,
    validatePhoneNumber
  };