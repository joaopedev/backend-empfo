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
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const { email, password }: UserModel = req.body;

        if (email && password) {
          const hashPassword = encodePassword(password);

          await Usuario.createUser(email, hashPassword)
            .then(() => {
              res.json({ message: "Usuário cadastrado com sucesso" });
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.ERRO_BANCO, tratarErro(erro)));
            });
        } else {
          next(
            createError(HTTP_ERRORS.SOLICITACAO, "Email ou senha inválidos")
          );
        }
      } else {
        next(
          createError(HTTP_ERRORS.SOLICITACAO, JSON.stringify(errors.array()))
        );
      }
    }
  );
  app.get(
    "/forgotPassword/",
    body("email").isEmail(),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const { email }: UserModel = req.body;

        if (email) {
          await Usuario.forgotPassword(email)
            .then(() => {
              res.json({ message: "Conta recuperada com sucesso" });
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.ERRO_BANCO, tratarErro(erro)));
            });
        } else {
          next(
            createError(HTTP_ERRORS.SOLICITACAO, "Email resgatado com sucesso")
          );
        }
      } else {
        next(
          createError(HTTP_ERRORS.SOLICITACAO, JSON.stringify(errors.array()))
        );
      }
    }
  );
};
