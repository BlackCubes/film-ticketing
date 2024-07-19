import express from 'express';

import AuthController from '@src/controllers/auth.controller';
import AsyncHandlerUtil from '@src/util/async-handler.util';

const router = express.Router();

router.post('/login', AsyncHandlerUtil(AuthController.login));

export default router;
