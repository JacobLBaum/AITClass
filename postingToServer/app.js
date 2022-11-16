const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, minLength: 3},
    password: {type: String, required: true}
});

