const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Log = sequelize.define("Log", {
  timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  action: { type: DataTypes.STRING, allowNull: false },
  meta: { type: DataTypes.JSON, allowNull: true },
});

module.exports = Log;
