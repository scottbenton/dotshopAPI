import { getDb } from "../config/db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.uid;
  try {
    const changes = req.body;

    const docRef = await db.collection('users').doc(id)
    if (!docRef) throw new Error('No ')
    docRef.update(changes);

    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send({ error: e.message, id: id });
  }
}