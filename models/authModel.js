const mongoose = require('mongoose');


const authSchema = mongoose.Schema({
    imgUrl: String,
    name: String,
    email: String,
    password: String
}, {
    versionKey: false
});



const AuthModel = mongoose.model('user', authSchema);



module.exports = { AuthModel };
