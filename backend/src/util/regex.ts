const imageFileTypes = /jpeg|jpg|png|webp/;

const mailingAddress = /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/;

const phoneNumber = /^\d{10}$/;

const uniqueCode = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[\]:;.,<>/?]{10}$/;

export { imageFileTypes, mailingAddress, phoneNumber, uniqueCode };
