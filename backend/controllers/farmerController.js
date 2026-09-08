const { readJSON, writeJSON } = require('../utils/jsonStore');

const getFarmers = (req, res) => {
  const farmers = readJSON('farmers.json');
  const { status } = req.query;

  if (status) {
    const filtered = farmers.filter(f => f.status.toLowerCase() === status.toLowerCase());
    return res.json(filtered);
  }

  res.json(farmers);
};

const updateFarmerStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'

  if (!status || !['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'rejected'." });
  }

  const farmers = readJSON('farmers.json');
  const farmerIndex = farmers.findIndex(f => f.id === id || f.userId === id);

  if (farmerIndex === -1) {
    return res.status(404).json({ message: "Farmer record not found." });
  }

  farmers[farmerIndex].status = status;
  writeJSON('farmers.json', farmers);

  // Also update status in users.json
  const userId = farmers[farmerIndex].userId;
  const users = readJSON('users.json');
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].status = status;
    writeJSON('users.json', users);
  }

  res.json({
    message: `Farmer status updated to ${status} successfully.`,
    farmer: farmers[farmerIndex]
  });
};

module.exports = {
  getFarmers,
  updateFarmerStatus
};
