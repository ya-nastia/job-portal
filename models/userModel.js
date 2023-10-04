import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password length should be greater than 6 characters'],
    select: true,
  },
  location: {
    type: String,
    default: 'Russia',
  }
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
}

userSchema.methods.createJWT = function() {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export default mongoose.model('User', userSchema);