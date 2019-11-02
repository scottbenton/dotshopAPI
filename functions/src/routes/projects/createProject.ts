import { getDb } from "../config/db";
import { getUIDFromToken } from '../auth';
import admin = require("firebase-admin");

const db = getDb();

module.exports = async (req: any, res: any) => {

  try {
    const name = req.body.name;
    if (!name) throw new Error('Name is required.');

    const uid = await getUIDFromToken(req);

    const data = req.body;
    const ref = await db.collection('projects').add(data);

    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      projects: admin.firestore.FieldValue.arrayUnion(ref.id)
    })

    res.json({
      id: ref.id,
      data
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}