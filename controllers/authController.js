import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400).send({ message: 'Please provide name', success: false });
    }

    if (!email) {
      res.status(400).send({ message: 'Please provide email', success: false });
    }

    if (!password) {
      res.status(400).send({ message: 'Please provide password', success: false });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Email already exists.'
      })
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      massage: 'User created successfully',
      user
    })
  } catch(error) {
    console.log(error);
    res.status(400).send({
      message: 'Error in register controller',
      success: false,
      error
    })
  }
}