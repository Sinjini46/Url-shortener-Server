const mongoose=require('mongoose');

const connectDB = async () => {
    try {
      const connect = await mongoose.connect(process.env.MONGO_URI);

      console.log(`DB connected: ${connect.connection.host}`);
    } catch (error) {
      console.error('[DB]', error);
      process.exit();
    }
  };

module.exports={
    connectDB,
}