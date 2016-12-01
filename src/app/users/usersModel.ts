import * as mongoose from 'mongoose';
import * as auth from '../../libs/auth';

/**
 * Mongoose model schema
 * @type {"mongoose".Schema}
 */
const UserModel = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  role: {type: String, required: true},
  lastLogin: {type: Date},
  created: {type: Date, default: Date.now},
  disabled: {type: Boolean, default: false},
  deleted: {type: Boolean, default: false}
});

/**
 * Mongoose pre middleware
 */
UserModel.pre('save', async(next) => {
  if (!this.isNew) {
    next();
  }
  else {
    try {
      const salt = await auth.generateSalt();
      this.password = await auth.generateHash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  }
});

/**
 * Mongoose post middleware
 */
UserModel.post('save', () => {
  // empty post middleware
});

/**
 * Reset password method
 * @param password
 */
UserModel.methods.resetPassword = async(password: string): Promise<void> => {
  try {
    const salt = await auth.generateSalt();
    this.password = await auth.generateHash(password, salt);
    await this.save();
  } catch (err) {
    throw err;
  }
};

/**
 * Check password method
 * @param password
 * @param caption - user agent
 * @returns {string}
 */

UserModel.methods.checkPassword = async(password: string, caption: string): Promise<string> => {
  try {
    const coincidence = await auth.comparePassword(password, this.password);
    if (coincidence) {
      this.lastlogin = Date.now();
      await this.save();
      return auth.generateToken(self, caption);
    }
  } catch (err) {
    throw err;
  }
};

mongoose.model('User', UserModel);
