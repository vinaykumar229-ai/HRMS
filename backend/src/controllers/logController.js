const { Log, User } = require("../models");

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({
      where: { OrganizationId: req.user.OrganizationId },
      include: {
        model: User,
        attributes: ["id", "name", "email"],
      },
      order: [["timestamp", "DESC"]],
    });

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      timestamp: log.timestamp,
      action: log.action,
      userId: log.UserId,
      userName: log.User ? log.User.name : "Unknown",
      userEmail: log.User ? log.User.email : null,
      meta: log.meta || {},
    }));

    res.json(formattedLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
