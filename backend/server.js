const express = require("express");
const cors = require("cors");
require("dotenv").config();


const sequelize = require("./src/config/db");

require("./src/models");

const authRoutes = require("./src/routes/auth");
const employeeRoutes = require("./src/routes/employee");
const teamRoutes = require("./src/routes/team");
const logRoutes = require("./src/routes/log");

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/logs", logRoutes);


const startServer = async () => {
  try {
    console.log("Connecting to PostgreSQL...");
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");

  
    await sequelize.sync();
    console.log("PostgreSQL models synced.");

    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start backend:", error);
  }
};

startServer();
