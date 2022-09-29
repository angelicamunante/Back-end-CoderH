import admin from "firebase-admin";
import serviceAccount from "../ctr/segunda-entrega-c4139-firebase-adminsdk-ud7e9-568ebe1878.json" assert { type: "json" };

function connectFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default connectFirebase;