'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';
import _debug from 'debug';

const debug = _debug('krs:user.model');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
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
  phone: {
    type: String
  },
  website: {
    type: String,
    validate: validate({
      validator: 'isURL',
      message: 'Invalid website'
    })
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
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
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.salt;
    }
  }
});

UserSchema.pre('validate', async function preValidate(next) {
  if (this.isNew && !this.password) {
    this.password = 'password';
  }
  next();
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', async function preSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    user.salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, user.salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
