import mongoose from 'mongoose';
let connection = false;

const connectTheDB = async () => {
  mongoose.set('strictQuery', true);

  //is database already connected
  if (connection) {
    console.log('mongoDB is connected');
  }
  //connet to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connection = true;
  } catch (error) {
    console.log(error);
  }
};
export default connectTheDB;
