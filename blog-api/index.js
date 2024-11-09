// Required Modules
const express = require("express"); // Express framework
const connectDB = require("./config/connectDB"); // Database connection function
const { xss } = require("express-xss-sanitizer"); // XSS sanitizer middleware
const { errorHandler, errorNotFoundHandler } = require("./middlewares/error"); // Custom error handling middlewares
const cors = require("cors"); // CORS middleware
const helmet = require("helmet"); // Security middleware for HTTP headers
require("dotenv").config(); // Environment variable management
const cookieParser = require("cookie-parser"); // Cookie parsing middleware

// App Initialization
const app = express();

// Middleware Setup
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend URL
    credentials: true, // Enable sending cookies with CORS requests
  })
);
app.use(helmet()); // Secure app by setting various HTTP headers
app.use(express.json()); // Parse JSON bodies
app.use(xss()); // Prevent XSS attacks by sanitizing input
app.use(cookieParser()); // Parse cookies from the client

// Database Connection
connectDB(); // Connect to MongoDB

// Start Server
try {
  app.listen(4000, () => {
    console.log("Express Server is Running on Port 4000"); // Confirm server is running
  });
} catch (error) {
  console.error("Server failed to start:", error); // Log server startup errors
}

// Rate Limiting (Optional)
// Uncomment to enable rate limiting for security
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//   })
// );

// Route Handlers
app.use("/api/", require("./routes/authRoute")); // Auth routes
app.use("/api/user/", require("./routes/userRoute")); // User routes
app.use("/api/post/", require("./routes/postRoute")); // Post routes
app.use("/api/comment/", require("./routes/commentRoute")); // Comment routes

// Error Handling Middlewares
app.use(errorNotFoundHandler); // Handle 404 errors
app.use(errorHandler); // General error handler
