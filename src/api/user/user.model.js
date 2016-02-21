'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        minlength: 3
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: validate({
            validator: 'isEmail',
            message: 'Please fill in your email'
        })
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
        default: 'http://lorempixel.com/400/200/abstract/1/'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('User', UserSchema);
