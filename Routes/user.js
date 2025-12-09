import express from 'express';
import { register,login } from '../Controllers/user.js';

const router = express.Router();

// @api des : user registration
// api method : post
// api endpoint : /api/users/register
router.post('/register', register); 

router.post('/login', login );

export default router;