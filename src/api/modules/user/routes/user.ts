import { Router } from "express";
import { UserController } from "../controller"
import multer from "multer";

const upload = multer();

const router = Router();

router.route('/')
    .get(UserController.getUsuarios)
    .post(UserController.createUsuario);

router.route('/avatar/:id')
    .get(UserController.getAvatar)
    .put(upload.single('image'), UserController.updateAvatar);

router.route('/:id')
    .get(UserController.getUsuario)
    .put(UserController.updateUsuario)
    .delete(UserController.updateUsuario);

export default router;