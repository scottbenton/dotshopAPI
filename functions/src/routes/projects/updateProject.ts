import { getDb } from "../config/db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const project = req.body;
    if (!project.name) throw new Error('Name is required.');

    const docRef = await db.collection('projects').doc(id)
    if (!docRef) throw new Error('No document found')
    docRef.set(project);

    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send({ error: e.message, id: id });
  }
}