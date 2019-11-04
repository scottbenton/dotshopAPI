import { getDb } from "../config/db";
const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const projectsSnapshot = db.collection('projects').doc(id).get();
    const movementSnapshot = db.collection('projects').doc(id).collection('movements').orderBy('index').get();

    await projectsSnapshot;
    console.log(await projectsSnapshot);
    if (!projectsSnapshot) {
      throw new Error('Project ' + id + ' not found.')
    }
    let project: any = {};
    project = projectsSnapshot.data();


    await movementSnapshot;
    if (movementSnapshot) {
      project.movements = movementSnapshot.data();
    }

    project.id = projectsSnapshot.id;

    res.status(200).json(project);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}