'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';
import debug from 'debug';

const log = debug('krs:user.model');
const SALT_WORK_FACTOR = 10;

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
        required: true,
        default: 'local'
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', async function preSave(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        log('generate a salt --> %s', salt);
        const hash = await bcrypt.hash(user.password, salt);
        log('hash the password using our new salt --> %s', hash);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
