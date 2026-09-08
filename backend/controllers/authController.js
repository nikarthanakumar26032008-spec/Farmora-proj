const { readJSON, writeJSON } = require('../utils/jsonStore');

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const users = readJSON('users.json');
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location || "Coimbatore",
      status: user.status || "approved"
    }
  });
};

const signup = (req, res) => {
  const { name, email, password, role, location, landArea, cropTypes } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Name, email, password, and role are required." });
  }

  const users = readJSON('users.json');
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return res.status(400).json({ message: "User with this email already exists." });
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name,
    email,
    password,
    role: role || "Consumer",
    location: location || "Coimbatore",
    status: role === "Farmer" ? "pending" : "approved",
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeJSON('users.json', users);

  if (role === "Farmer") {
    const farmers = readJSON('farmers.json');
    const newFarmerRecord = {
      id: `frm_${Date.now()}`,
      userId: newUser.id,
      name,
      email,
      location: location || "Coimbatore",
      landArea: landArea || "2 acres",
      cropTypes: cropTypes || ["Vegetables"],
      photos: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600"
      ],
      status: "pending",
      submittedAt: new Date().toISOString()
    };
    farmers.push(newFarmerRecord);
    writeJSON('farmers.json', farmers);
  }

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      location: newUser.location,
      status: newUser.status
    }
  });
};

const forgotPassword = (req, res) => {
  const { email, newPassword } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const users = readJSON('users.json');
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

  if (userIndex === -1) {
    return res.status(404).json({ message: "No account found with this email." });
  }

  if (newPassword) {
    users[userIndex].password = newPassword;
    writeJSON('users.json', users);
    return res.json({ message: "Password updated successfully. Please sign in." });
  }

  res.json({ message: "Password reset link/verification email sent successfully." });
};

module.exports = {
  login,
  signup,
  forgotPassword
};
