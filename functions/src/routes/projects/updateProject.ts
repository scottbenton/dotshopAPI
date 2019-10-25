import { getDb } from "../../db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const name = req.body.name;

    if (!name) throw new Error('Name is required.');

    const data = { name };
    const docRef = await db.collection('projects').doc(id)
    if (!docRef) throw new Error('No ')
    docRef.set(data);

    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send({ error: e.message, id: id });
  }
}