
import * as functions from 'firebase-functions';
import { getDb } from '../db';
const db = getDb();

const DEFAULT_USER_OPTIONS = {
  projects: []
}

export const onUserCreate = functions.auth.user().onCreate(async user => {
  const uid = user.uid;

  await db.collection('users').doc(uid).set(DEFAULT_USER_OPTIONS);
})