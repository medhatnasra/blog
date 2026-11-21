// Import Mongoose for MongoDB interactions
const mongoose = require("mongoose");

require("dotenv").config();

// Function to connect to MongoDB
const connectDB = () => {
  try {
    // Set Mongoose options
    mongoose.set("strictQuery", false); // Disable strict mode for queries

    // Connect to the MongoDB database
    mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => console.log("Database connected...")) // Log success message if connected
      .catch((err) => console.error("Database connection failed:", err)); // Handle connection errors
  } catch (err) {
    // Catch any errors in case of unexpected issues
    console.error("An unexpected error occurred:", err);
  }
};

// Export the connectDB function for use in other parts of the app
module.exports = connectDB;
