const { Team, Employee, Log } = require("../models");

exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      ...req.body,
      OrganizationId: req.user.OrganizationId,
    });

    await Log.create({
      action: "Team created",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { teamId: team.id },
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { OrganizationId: req.user.OrganizationId },
      include: Employee,
    });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
    });
    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.update(req.body);

    await Log.create({
      action: "Team updated",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { teamId: team.id },
    });

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findOne({
      where: { id, OrganizationId: req.user.OrganizationId },
    });
    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.destroy();

    await Log.create({
      action: "Team deleted",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
      meta: { teamId: id },
    });

    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};