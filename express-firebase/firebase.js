var admin = require("firebase-admin");
const path = require("path");

var serviceAccount = require(path.join(__dirname, "credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };