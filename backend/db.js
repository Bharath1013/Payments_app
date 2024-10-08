// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongoUrl)

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    transactions: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to User model
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        transaction: {
            type: Number,
            required: true
        },
        date:{
            type:Date,
            default: Date.now
        }

    }]
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};
