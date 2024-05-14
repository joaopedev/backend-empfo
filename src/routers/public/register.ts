import { body, validationResult } from "express-validator";
import { HTTP_ERRORS, UserModel } from "../../models/model";
import createError from "http-errors";
import { UserLogin } from "../../database/users";
import { Application, NextFunction, Request, Response } from "express";
import { tratarErro } from "../../utils/error";
import { encodePassword } from "../../utils/bcrypt";
import { Usuario } from "../../database/dbAccounts";

export = (app: Application) => {
  app.post(
    "/registerUsers",
    body("email").isEmail(),
    body("password")
      .exists()
      .isLength({ min: 8 })
      .withMessage("A senha deve conter pelo menos 8 caracteres"),
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const { email, password }: UserModel = req.body;

        if (email && password) {
          const hashPassword = encodePassword(password);

          await UserLogin.createUser(email, hashPassword)
            .then(() => {
              res.json({ message: "Usuário cadastrado com sucesso" });
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.BAD_REQUEST, tratarErro(erro)));
            });
        } else {
          next(
            createError(HTTP_ERRORS.BAD_REQUEST, "Email ou senha inválidos")
          );
        }
      } else {
        next(
          createError(
            HTTP_ERRORS.VALIDACAO_DE_DADOS,
            JSON.stringify(errors.array())
          )
        );
      }
    }
  );
  app.get(
    "/forgotPassword/:email",
    async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        const email: string = req.params.email;

        if (email) {
          await UserLogin.forgotPassword(email)
            .then(() => {
              res.json({
                message:
                  "Foi enviado email de recuperação para o email cadastrado",
              });
            })
            .catch((erro) => {
              console.error(erro);
              next(createError(HTTP_ERRORS.BAD_REQUEST, tratarErro(erro)));
            });
        } else {
          next(createError(HTTP_ERRORS.SUCESSO, "Email resgatado com sucesso"));
        }
      } else {
        next(
          createError(
            HTTP_ERRORS.VALIDACAO_DE_DADOS,
            JSON.stringify(errors.array())
          )
        );
      }
    }
  );

  app.get(
    "/forgotWithToken/:token",
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.params.token;

      await Usuario.updateForgotPassword(token)
        .then((result) => {
          if (result) {
            res.json({ message: "Token valido" });
          } else {
            res.status(404).json({ message: "Token inválido" });
          }
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_INTERNO, erro));
        });
    }
  );

  app.put(
    "/resetPassword/:email",
    async (req: Request, res: Response, next: NextFunction) => {
      const email = req.params.email;
      const newPassword = req.body.newPassword;
      const hashPassword = encodePassword(newPassword);
      await Usuario.resetUserPassword(email, hashPassword)
        .then((result) => {
          if (result) {
            res.json({ message: "Senha atualizada com sucesso" });
          } else {
            res.status(404).json({ message: "Usuário não encontrado" });
          }
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_INTERNO, erro));
        });
    }
  );
};
