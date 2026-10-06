import { Router } from 'express';
import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import { registerUser, loginUser } from '../controllers/authController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     description: Create a user account with an email address and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Missing email or password, or the user already exists
 */
router.post('/auth/register', async (req, res) => {
    const response = await registerUser(req.body.email, req.body.password);
    res.status(response.success ? 201 : 400).json(response);
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in
 *     description: Authenticate a user and return a JWT bearer token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                 token:
 *                   type: string
 *                   description: JWT to send in the Authorization header as a Bearer token
 *       '401':
 *         description: Missing or invalid credentials
 */
router.post('/auth/login', async (req, res) => {
    const response = await loginUser(req.body.email, req.body.password);
    res.status(response.success ? 200 : 401).json(response);
});


/**
 * @openapi
 * /contacts:
 *   get:
 *     description: All contacts
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Returns all the contacts
 *       '401':
 *         description: Missing, invalid, or expired bearer token
 */
router.route('/contacts').get(requireAuth, async (req, res) => {
    let response = await getAllContacts();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


/**
 * @openapi
 * /contacts/{id}:

 *   get:
 *     description: Get a contact by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns the contact with the specified ID
 *       '404':
 *         description: Contact not found
 *       '401':
 *         description: Missing, invalid, or expired bearer token
 */
router.route('/contacts/:id').get(requireAuth, async (req, res) => {
    let response = await getContactById(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});


/**
 * @openapi
 * /contacts:
 *   post:
 *     description: Add a new contact
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Missing, invalid, or expired bearer token
 */
router.route('/contacts').post(requireAuth, async (req, res) => {
    let response = await addContact(req.body);
    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(400).json(response);
    }
});

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     description: Update a contact by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       '200':
 *         description: Contact updated successfully
 *       '404':
 *         description: Contact not found
 *       '401':
 *         description: Missing, invalid, or expired bearer token
 */
router.route('/contacts/:id').put(requireAuth, async (req, res) => {
    let response = await updateContact(req.params.id, req.body.name, req.body.age);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     description: Remove a contact by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Contact removed successfully
 *       '404':
 *         description: Contact not found
 *       '401':
 *         description: Missing, invalid, or expired bearer token
 */
router.route('/contacts/:id').delete(requireAuth, async (req, res) => {
    let response = await removeContact(req.params.id);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

export default router;
    
