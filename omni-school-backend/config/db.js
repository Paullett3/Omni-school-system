/**
 * 🗄️ DATABASE CONFIGURATION
 * Connects the Omni School System to MongoDB Atlas
 */
import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    // 🔗 Attempting connection using the MONGO_URI from your .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // 🎨 Colorful console log to confirm success (Magenta)
    console.log(`\x1b[35m%s\x1b[0m`, `✨ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    // 🛑 If it fails, show the error and stop the server
    console.error(`\x1b[31m%s\x1b[0m`, `❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); 
  }
};

// 🚀 Exporting for use in server.js
export default connectDB;