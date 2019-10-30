import { getDb } from "../config/db";
const db = getDb();

module.exports = async (req: any, res: any) => {
  const id = req.params.projectId;
  try {
    const projectsSnapshot = await db.collection('projects').doc(id).get();
    if (!projectsSnapshot) {
      throw new Error('Project ' + id + ' not found.')
    }
    let project: any = {};
    project.id = projectsSnapshot.id;
    project.data = projectsSnapshot.data();

    res.status(200).json(project);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}