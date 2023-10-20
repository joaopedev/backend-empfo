import { body, validationResult } from "express-validator";
import { HTTP_ERRORS, UserModel } from "../../model/model";
import createError from "http-errors";
import { Usuario } from "../../database/users";
import { Application, NextFunction, Request, Response } from "express";
import { tratarErro } from "../../utils/error";
import { encodePassword } from "../../utils/bcrypt";

export = (app: Application) => {
  app.post(
    "/registerUsers",
    body("email").isEmail(),
    body("password").exists(),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
  
      if (errors.isEmpty()) {
        const { email, password }: UserModel = req.body;
  
        if (email && password) {
          const hashPassword = encodePassword(password);
  
          Usuario.createUser(email, hashPassword)
            .then(() => {
              res.json({ message: "Usuário cadastrado com sucesso" });
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.ERRO_BANCO, tratarErro(erro)));
            });
        } else {
          next(createError(HTTP_ERRORS.SOLICITACAO, "Email ou senha inválidos"));
        }
      } else {
        next(
          createError(HTTP_ERRORS.SOLICITACAO, JSON.stringify(errors.array()))
        );
      }
    }
  );
};
