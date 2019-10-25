const users = require('express').Router();

const getOneUser = require('./getOneUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

/**
* @swagger
* /users/{uid}:
*  get:
*    description: Gets one project from the database
*    tags:
*      - users
*    parameters:
*      - in: path
*        name: uid
*        schema:
*          type: string
*        required: true
*        description: ID of the user
*    responses:
*      200:
*        description: returns all projects from the db
*        schema:
*          type: object
*          properties:
*            id:
*              type: string
*              description: DB Primary Key ID
*            data:
*              type: object
*              properties:
*                projects:
*                  type: array
*                  items:
*                   type: string
*                  description: list of keys to user projects
*      400:
*        description: failure fetching projects
*/
users.get('/:uid', getOneUser);

/**
 * @swagger
 * /users/{uid}:
 *  put:
 *    description: Updates one user in the database
 *    tags:
 *      - users
 *    parameters:
 *      - in: body
 *        name: user
 *        description: Body of the request, takes changes on the user
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            projects:
 *              type: array
 *              items:
 *                type: string
 *              description: the list of projects a user has access to
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user
 *    responses:
 *      200:
 *        description: updates a user in the db
 *      400:
 *        description: failure updating user
 */
users.put('/:uid', updateUser);

/**
 * @swagger
 * /users/{uid}:
 *  delete:
 *    description: Deletes one user in the database
 *    tags:
 *      - users
 *    parameters:
 *      - in: path
 *        name: uid
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user
 *    responses:
 *      200:
 *        description: deletes a user from the db
 *      400:
 *        description: failure deleting user
 */
users.delete('/:uid', deleteUser);

module.exports = users;