import { getDb } from "../config/db";
import { getUIDFromToken } from '../auth';
import admin = require("firebase-admin");

const db = getDb();

module.exports = async (req: any, res: any) => {

  try {
    const project = req.body;
    if (!project.name) throw new Error('Name is required.');

    const uid = await getUIDFromToken(req);

    const ref = await db.collection('projects').add(project);

    const userRef = db.collection('users').doc(uid);
    await userRef.update({
      projects: admin.firestore.FieldValue.arrayUnion(ref.id)
    })

    res.json({
      id: ref.id,
      project
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}