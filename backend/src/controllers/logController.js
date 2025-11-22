const { Log } = require("../models");

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({ where: { OrganizationId: req.user.OrganizationId } });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
