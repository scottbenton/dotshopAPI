import { getDb } from "../config/db";
const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const projectSnapshot = await db.collection('projects').doc(id).get();
    const movementSnapshot = await db.collection('projects').doc(id).collection('movements').orderBy('index').get();

    let project: any = {};
    project = projectSnapshot.data();
    project.id = id;
    project.movements = movementSnapshot.data();

    res.status(200).json(project);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}