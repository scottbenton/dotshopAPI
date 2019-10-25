import { getDb } from "../../db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const docRef = await db.collection('projects').doc(id)
    if (!docRef) throw new Error('No project with id ' + id + ' found.');
    docRef.delete();

    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send({ error: e.message, id: id });
  }
}