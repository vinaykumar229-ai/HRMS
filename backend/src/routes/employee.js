const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.post("/:id/assign", employeeController.assignTeams);
router.get("/:id/teams", employeeController.getEmployeeTeams);

module.exports = router;