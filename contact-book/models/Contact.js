var mongoose = require('mongoose');

// DB의 구조
var contactSchema = mongoose.Schema({
    name: {type:String, required:true, unique: true},
    email: {type:String},
    phone: {type:String}
});

var Contact = mongoose.model('contact', contactSchema); // contactSchema의 model 생성

module.exports = Contact;