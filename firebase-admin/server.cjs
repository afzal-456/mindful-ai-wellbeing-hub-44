const express = require("express");
const cors = require("cors");
const { deleteAuthUser, deleteUserByEmail } = require("./deleteUser.cjs");

const app = express();

app.use(express.json());
app.use(cors());

// Delete user by UID endpoint
app.delete("/api/delete-user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    await deleteAuthUser(uid);
    res.status(200).json({ message: "User deleted from Firebase Authentication." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user by UID." });
  }
});

// Delete user by Email endpoint
app.delete("/api/delete-user-email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await deleteUserByEmail(email);
    if (result.success) {
      res.status(200).json({ message: "User deleted from Authentication and Firestore." });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user by email." });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Admin backend running at http://localhost:${PORT}`);
});
