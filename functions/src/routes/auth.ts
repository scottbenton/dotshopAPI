import admin = require('firebase-admin');

export async function getUIDFromToken(req: any) {
  const token = req.header('token');
  if (!token) {
    throw new Error('Please log in.');
  }
  const decodedToken = await admin.auth().verifyIdToken(token);

  if (!decodedToken || !decodedToken.uid) {
    throw new Error('Please log in.');
  }
  let uid = decodedToken.uid;

  return uid;
}