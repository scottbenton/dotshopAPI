import { getDb } from "../../db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  try {
    const name = req.body.name;

    if (!name) throw new Error('Name is required.');

    const data = { name };
    const ref = await db.collection('projects').add(data);
    res.json({
      id: ref.id,
      data
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
}