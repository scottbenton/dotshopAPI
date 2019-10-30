// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let db: any;

export function initDb() {
  if (db) {
    console.warn("Trying to init DB again");
    return db;
  }
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://field-set-54072.firebaseio.com"
  });

  db = admin.firestore();

  return db;
}

export function getDb() {
  if (!db) {
    return initDb();
  }
  return db;
}