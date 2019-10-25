const projects = require('express').Router();
const getAllProjects = require('./getAllProjects');
const getOneProject = require('./getOneProject');
const createProject = require('./createProject');
const updateProject = require('./updateProject');
const deleteProject = require('./deleteProject');

/**
 * @swagger
 * /projects:
 *  get:
 *    description: Gets all the projects from the database
 *    tags: 
 *      - projects
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
 *                name: 
 *                  type: string
 *                  description: the name of the project
 *      400:
 *        description: failure fetching projects
 */
projects.get('/', getAllProjects);

/**
 * @swagger
 * /projects/{projectId}:
 *  get:
 *    description: Gets one project from the database
 *    tags:
 *      - projects
 *    parameters:
 *      - in: path
 *        name: projectId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the project
 *    responses:
 *      200:
 *        description: returns project with the given id from the db
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              description: DB Primary Key ID
 *            data:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: the name of the project
 *      400:
 *        description: failure fetching projects
 */
projects.get('/:projectId', getOneProject);

/**
 * @swagger
 * /projects:
 *  post:
 *    description: Creates one project to add to the database
 *    tags:
 *      - projects
 *    parameters:
 *      - in: body
 *        name: project
 *        description: Body of the request, takes info on the project
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            -name
 *          properties:
 *            name:
 *              type: string
 *              description: the name of the project
 *    responses:
 *      200:
 *        description: posts a new project to the db
 *      400:
 *        description: failure adding project
 */
projects.post('/', createProject);

/**
 * @swagger
 * /projects/{projectId}:
 *  put:
 *    description: Updates one project in the database
 *    tags:
 *      - projects
 *    parameters:
 *      - in: body
 *        name: project
 *        description: Body of the request, takes info on the project
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            -name
 *          properties:
 *            name:
 *              type: string
 *              description: the name of the project
 *      - in: path
 *        name: projectId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the project
 *    responses:
 *      200:
 *        description: updates a project in the db
 *      400:
 *        description: failure updating project
 */
projects.put('/:projectId', updateProject);

/**
 * @swagger
 * /projects/{projectId}:
 *  delete:
 *    description: Deletes one project in the database
 *    tags:
 *      - projects
 *    parameters:
 *      - in: path
 *        name: projectId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the project
 *    responses:
 *      200:
 *        description: deletes a project from the db
 *      400:
 *        description: failure deleting project
 */
projects.delete('/:projectId', deleteProject);

module.exports = projects;