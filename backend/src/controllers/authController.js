const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Organization, Log } = require("../models");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET not configured" });
    }

    const { organizationName, name, email, password } = req.body;

    if (!organizationName || !name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let organization = await Organization.findOne({ where: { name: organizationName } });
    if (!organization) {
      organization = await Organization.create({ name: organizationName });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      OrganizationId: organization.id,
    });

    await Log.create({
      action: "User signup",
      UserId: user.id,
      OrganizationId: organization.id,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, userId: user.id });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email or organization name already exists" });
    }
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET not configured" });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    await Log.create({
      action: "User login",
      UserId: user.id,
      OrganizationId: user.OrganizationId,
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await Log.create({
      action: "User logout",
      UserId: req.user.id,
      OrganizationId: req.user.OrganizationId,
    });
    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "OrganizationId"],
      include: {
        model: Organization,
        attributes: ["id", "name"],
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.Organization ? { id: user.Organization.id, name: user.Organization.name } : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
