const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, teamController.createTeam);
router.get("/", authMiddleware, teamController.getTeams);
router.put("/:id", authMiddleware, teamController.updateTeam);
router.delete("/:id", authMiddleware, teamController.deleteTeam);

module.exports = router;
