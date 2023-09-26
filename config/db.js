import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB database ${mongoose.connection.host}`);
  } catch (e) {
    console.log(e)
  }
};

export default connectDB;