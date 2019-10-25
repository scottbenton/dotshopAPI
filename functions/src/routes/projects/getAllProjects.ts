import { getDb } from "../../db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  try {
    const projectsSnapshot = await db.collection('projects').get();
    let projects: any = [];
    projectsSnapshot.forEach((proj: any) => {
      projects.push({
        id: proj.id, data: proj.data()
      });
    })
    res.status(200).json(projects);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}