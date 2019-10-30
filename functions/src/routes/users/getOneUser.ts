import { getDb } from "../config/db";

const db = getDb();

module.exports = async (req: any, res: any) => {
  const uid = req.params.uid;
  try {
    const userSnapshot = await db.collection('users').doc(uid).get();
    if (!userSnapshot) {
      throw new Error('User with id ' + uid + ' not found.')
    }
    let user: any = {};
    user.id = userSnapshot.id;
    user.data = userSnapshot.data();

    res.status(200).json(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};