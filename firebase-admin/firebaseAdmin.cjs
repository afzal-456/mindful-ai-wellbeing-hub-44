// /firebase-admin/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("C:\\Aashu\\Mindful\\service-account-key.json"); // path to your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
