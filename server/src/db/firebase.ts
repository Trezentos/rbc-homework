import * as admin from 'firebase-admin';


var serviceAccount = require("../../componentes-computador-f9fb3-firebase-adminsdk-bre4y-156e407caa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});

const db = admin.firestore();

export default db;