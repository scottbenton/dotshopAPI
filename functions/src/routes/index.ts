import * as express from 'express';

const projects = require('./projects');
const users = require('./users');

const routes = express.Router();
routes.use('/projects', projects);
routes.use('/users', users);

/**
 * @swagger
 * /:
 *  get:
 *    description: Shows that we are connected to the api
 *    responses:
 *      200:
 *        description: successful connection
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Connection string
 *      400:
 *        description: failure connecting
 */
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
})

module.exports = routes;