import express from 'express';

import { newContact } from '../Controllers/contact.js';
import { getAllContacts } from '../Controllers/contact.js';
import { getById } from '../Controllers/contact.js';
import { updateContact } from '../Controllers/contact.js';  
import { deleteContact } from '../Controllers/contact.js';
import { authMiddleware } from '../Middlewares/Auth.js';
import { getByUserId } from '../Controllers/contact.js';

const router = express.Router();

// @api des : create new contact
// api method : post
// api endpoint : /api/contact/new
router.post('/new',authMiddleware, newContact);
router.get('/', getAllContacts);
router.get('/:id', getById);
router.put('/:id',authMiddleware, updateContact);
router.delete('/:id',authMiddleware, deleteContact);

// get contact by specific user id
router.get('/userid/:id', getByUserId);

export default router;