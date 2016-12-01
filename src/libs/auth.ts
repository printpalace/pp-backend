import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Generate token
 * @param user
 * @param caption
 * @returns {string}
 */
export const generateToken = (user, caption: string): string => {
  const profile = {
    _id: user._id,
    name: user.name,
    role: user.role,
    email: user.email,
    caption: caption
  };

  return jwt.sign(profile, process.env.TOKEN_SECRET, {
    algorithm: process.env.TOKEN_ALGORITHM || 'HS256'
  });
};

/**
 * Generate salt
 * @param len
 * @returns {Promise<string>}
 */
export const generateSalt = (len: number = 10): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(len, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
};

/**
 * Generate hash
 * @param pass
 * @param salt
 * @returns {Promise<string>}
 */
export const generateHash = (pass, salt): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

/**
 * Compare password with hash in database
 * @param pass
 * @param hash
 * @returns {Promise<boolean>}
 */
export const comparePassword = (pass, hash): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, coincidence) => {
      if (err) {
        reject(err);
      } else {
        resolve(coincidence);
      }
    });
  });
};
