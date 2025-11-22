const { Employee, Team, Log } = require("../models");

exports.createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      ...req.body,
      OrganizationId: req.user.OrganizationId,
    });

    await Log.create({
      action: "Employee created",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { employeeId: employee.id },
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { OrganizationId: req.user.OrganizationId },
      include: Team,
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.update(req.body);

    await Log.create({
      action: "Employee updated",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { employeeId: employee.id },
    });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();

    await Log.create({
      action: "Employee deleted",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { employeeId: id },
    });

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamIds = [] } = req.body;

    const employee = await Employee.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
      include: Team,
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const teams = await Team.findAll({
      where: { id: teamIds, OrganizationId: req.user.OrganizationId },
    });
    await employee.setTeams(teams);

    await Log.create({
      action: "Employee assigned to teams",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { employeeId: employee.id, teamIds },
    });

    res.json(await Employee.findByPk(id, { include: Team }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
      include: Team,
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee.Teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};