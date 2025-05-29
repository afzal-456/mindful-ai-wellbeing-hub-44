const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("C:\\Aashu\\Mindful\\service-account-key.json"); // Update to your actual path

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

/**
 * Delete user from Firebase Authentication and Firestore collections by email
 * @param {string} email - User's email to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
async function deleteUserByEmail(email) {
  try {
    // Delete from Firebase Auth
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(userRecord.uid);
    console.log(`Auth account for ${email} deleted`);

    // Delete documents from Firestore "users" collection where email matches
    const usersSnapshot = await db.collection("users").where("email", "==", email).get();
    usersSnapshot.forEach(doc => doc.ref.delete());

    // Delete documents from Firestore "allowedUsers" collection where email matches
    const allowedSnapshot = await db.collection("allowedUsers").where("email", "==", email).get();
    allowedSnapshot.forEach(doc => doc.ref.delete());

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete user from Firebase Authentication by UID
 * @param {string} uid - User UID to delete
 * @returns {Promise<void>}
 */
async function deleteAuthUser(uid) {
  try {
    await admin.auth().deleteUser(uid);
    console.log(`Deleted user: ${uid}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

module.exports = { deleteUserByEmail, deleteAuthUser };
