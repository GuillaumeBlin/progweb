import express from 'express';
import users from './users.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/contacts', users.getContacts);
router.post('/contact', users.addContact);

export default router;
