import { getDb } from "../config/db";
const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const projectsPromise = db.collection('projects').doc(id).get();
    const movementPromise = db.collection('projects').doc(id).collection('movements').orderBy('index').get();

    const movementSnapshot = await movementPromise;
    const projectsSnapshot = await projectsPromise;

    console.log('Project Snapshot: ' + projectsSnapshot);
    console.log('Movement Snapshot: ' + movementSnapshot);

    if (!await projectsSnapshot) {
      throw new Error('Project ' + id + ' not found.')
    }

    let project: any = {};

    project = projectsSnapshot.data();
    project.movements = movementSnapshot.data();
    project.id = projectsSnapshot.id;

    res.status(200).json(project);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}