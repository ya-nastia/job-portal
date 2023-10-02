import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

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

  const user = await userModel.create({ name, email, password });
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
}