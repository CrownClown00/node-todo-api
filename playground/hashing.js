const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
  id:10
};
var token = jwt.sign(data,'123abc');

var decoded = jwt.verify(token,'123abc')

console.log(`token: ${token} decoded:${decoded}`);
console.log(decoded);
// var message = 'I am user 3';
// var hash = SHA256(message).toString();
// console.log(`message:${message} and hash:${hash}`);
