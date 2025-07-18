import { Router } from 'express';

const router = Router();

import { getAllBooks, searchBook, getBookById, createBook, updateBookById, deleteBookById } from '../controllers/products.controller.js';

import { auth } from '../middlewares/auth.middleware.js';

router.get('/products', getAllBooks); 
router.get('/products/search', searchBook);
router.get('/products/:id', getBookById);
router.post('/products/create', auth, createBook);
router.put('/products/:id', auth, updateBookById);
router.delete('/products/:id', auth, deleteBookById);

export default router;