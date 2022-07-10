const mongoose = require('mongoose');
const validator = require('validator');

const feeSchema = mongoose.Schema({
    ID: {
        type: Number,
        required: [true, "Please enter the ID number"],
        unique: true,
    },
    Amount: {
        type: Number,
        required: [true, "Please enter amount"]
    },
    currency: {
        type: String
    },
    CustomerEmail: {
        type: String,
        required: [true, "Please enter your email address."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    SplitInfo: {
        type: [],
        required: [true, "Please enter the SplitInfo"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Fee', feeSchema);