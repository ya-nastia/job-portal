import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password, lastName } = req.body;

  if (!name) {
    next('Name is required');
  }

  if (!email) {
    next('Email is required');
  }

  if (!password) {
    next('Password is required and should be greater than 6 characters');
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next('User already exists.');
  }

  const user = await userModel.create({ name, email, password, lastName });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    massage: 'User created successfully',
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  })
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next('Please provide all fields');
  }

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return next('Invalid username or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next('Invalid username or password');
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: 'Login successfully',
    user,
    token,
  });
};