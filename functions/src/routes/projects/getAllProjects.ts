import { getDb } from "../config/db";
import { getUIDFromToken } from '../auth';

const db = getDb();

module.exports = async (req: any, res: any) => {
  try {
    const uid = await getUIDFromToken(req);
    const userSnapshot = await db.collection('users').doc(uid).get();
    const user = userSnapshot.data();

    let projects: any = [];

    await user.projects.forEach(async (projId: any) => {
      const projectSnapshot = await db.collection('projects').doc(projId).get();
      const project = projectSnapshot.data();

      if (project) {
        projects.push({
          name: project.name
        });
      }
    });
    res.status(200).json(projects);
  }
  catch (e) {
    res.status(400).send({ error: e.message });
  }
}