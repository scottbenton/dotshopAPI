import { getDb } from "../config/db";
import { getUIDFromToken } from '../auth';

const db = getDb();

module.exports = async (req: any, res: any) => {
  try {
    const uid = await getUIDFromToken(req);
    const userSnapshot = await db.collection('users').doc(uid).get();
    const user = userSnapshot.data();

    let responsePromises: any = [];
    user.projects.forEach((projectID: string) => {
      responsePromises.push({ id: projectID, dataSnapshot: db.collection('projects').doc(projectID).get() });
    })

    let promises = responsePromises.map((resp: any) => resp.dataSnapshot);
    console.log(promises);
    Promise.all(promises).then((values) => {
      console.log(values);
      let responseProjects: any = [];
      values.forEach((projectSnapshot: any, index: number) => {
        console.log(projectSnapshot);
        const project = projectSnapshot.data();
        if (project) {
          responseProjects.push({
            id: responsePromises[index].id,
            name: project.name,
            description: project.description
          });
        }
      });

      res.status(200).json(responseProjects);
    });

  }
  catch (e) {
    res.status(400).send({ error: e.message });
  }
}