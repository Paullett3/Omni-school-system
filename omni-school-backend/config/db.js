import mongoose from 'mongoose';

// 🗄️ DATABASE CONNECTION FUNCTION
const connectDB = async () => {
  try {
    // Attempt to connect using the URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\x1b[35m%s\x1b[0m`, `Successfully connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// ✅ FIX: Changed from module.exports to export default
export default connectDB;