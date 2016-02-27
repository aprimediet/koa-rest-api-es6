import mongoose from 'mongoose';
import uuid from 'node-uuid';
import _debug from 'debug';
import config from '../config';

const debug = _debug('krs:auth.model.refresh-token');

const RefreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  created_at: {
    type: Date,
    expires: config.refreshTokenExpiration
  }
});

RefreshTokenSchema.pre('validate', async function preValidate(next) {
  if (this.isNew) {
    this.token = uuid.v4();
    this.created_at = Date.now();
  }
  next();
});

export default mongoose.model('RefreshToken', RefreshTokenSchema);
