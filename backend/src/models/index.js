const User = require("./User");
const Organization = require("./Organization");
const Employee = require("./Employee");
const Team = require("./Team");
const Log = require("./Log");

Organization.hasMany(User);
User.belongsTo(Organization);

Organization.hasMany(Employee);
Employee.belongsTo(Organization);

Organization.hasMany(Team);
Team.belongsTo(Organization);

Team.belongsToMany(Employee, { through: "EmployeeTeam" });
Employee.belongsToMany(Team, { through: "EmployeeTeam" });

User.hasMany(Log);
Organization.hasMany(Log);
Log.belongsTo(User);
Log.belongsTo(Organization);

module.exports = { User, Organization, Employee, Team, Log };
