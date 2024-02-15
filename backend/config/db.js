import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "E-commerce",
    });
    console.log(`Database connected to : ${mongoose.connection.host}`)
  } catch (error) {
    console.log(`Error in database connection : ${mongoose}`);
  }
};
