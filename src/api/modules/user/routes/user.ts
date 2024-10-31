import { Router } from "express";
import { UserController } from "../controller"

const router = Router();

router.route('/')
    .get(UserController.getUsuarios)
    .post(UserController.createUsuario);

router.route('/:id')
    .get(UserController.getUsuario)
    .put(UserController.updateUsuario)
    .delete(UserController.updateUsuario);

export default router;