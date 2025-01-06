const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
// const expressPino = require('express-pino-logger');
// const logger = require('./configs/winston.config.js');
const crypto = require("crypto");
const compression = require("compression");
const connectDb = require("./configs/mongodb.config.js");
const { errorHandler } = require("./middlewares/error.handler.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger.config.js");
require("dotenv").config();

const wishlistRoutes = require("./routes/wishlist.route.js");
const userRoutes = require("./routes/user.route.js");
const authRoutes = require("./routes/user.login.route.js");

connectDb();

app.use(compression());

app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ORIGIN1],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Restrict methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to generate a CSP nonce
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(32).toString("base64"); // Use 32 bytes for better performance while retaining good randomness
  next();
});

// Configure Helmet with improved security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`], // Proper function-based nonce usage
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`], // Avoid 'unsafe-inline' when possible
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        fontSrc: ["'self'"],
        frameSrc: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [], // Enables automatic upgrade to HTTPS
      },
    },
    crossOriginEmbedderPolicy: { policy: "require-corp" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: {
      maxAge: 31536000, // One year in seconds
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: true,
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" }, // Correcting usage (consistent terminology)
    originAgentCluster: true,
  })
);

app.use(express.json());
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);


app.use("/api/wishlist",wishlistRoutes);
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

// // Request Logger Middleware (using express-pino)
// app.use(expressPino({ logger }));

// // Global error handling for uncaught exceptions and unhandled rejections
// process.on('uncaughtException', (err) => {
//   logger.error(`Uncaught Exception: ${err.message}`);
//   process.exit(1); // Exit process after logging the error
// });

// process.on('unhandledRejection', (reason, promise) => {
//   logger.error(`Unhandled Rejection: ${reason}`);
//   process.exit(1); // Exit process after logging the error
// });

// // Gracefully shutdown the application on SIGINT or SIGTERM
// const shutdown = () => {
//   logger.info(`Worker ${process.pid} shutting down gracefully.`);
//   process.exit(0); // Gracefully shutdown
// };

// // Handle signals for graceful shutdown
// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);

app.listen(process.env.SOURCE_PORT, () => {
  console.log(`App is listening at port ${process.env.SOURCE_PORT}`);
  console.log(
    `Swagger Docs available at http://${process.env.SOURCE}:${process.env.SOURCE_PORT}/api/api-docs`
  );
});
