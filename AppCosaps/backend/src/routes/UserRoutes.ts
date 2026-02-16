import express from "express";

import { UserController } from "../controllers/UserController.ts";

const router = express.Router();

router.post("/cadastrar",UserController.create_new_user);
router.post("/login",UserController.login);
router.post("/alterar_senha",UserController.update_password);

export default router;