import { HTTP_ERRORS } from "../../models/model";
import createError from "http-errors";
import { Usuario } from "../../database/dbAccounts";
import { Application, NextFunction, Request, Response } from "express";
import { encodePassword } from "../../utils/bcrypt";

export = (app: Application) => {
  app.get(
    "/private/account",
    async (req: Request, res: Response, next: NextFunction) => {
      let id_usuario = <string>req.query.id_usuario;

      await Usuario.getUsers(id_usuario)
        .then((contas) => {
          res.json({
            message: "Contas recuperadas com sucesso",
            contas: contas,
          });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.VALIDACAO_DE_DADOS, erro));
        });
    }
  );

  app.get(
    "/private/accountById/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      let id_usuario = req.params.id;

      await Usuario.getUserById(id_usuario)
        .then((contas) => {
          res.json({
            message: "Conta recuperada com sucesso",
            contas: contas,
          });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.VALIDACAO_DE_DADOS, erro));
        });
    }
  );

  app.put(
    "/private/updateAccount/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id_usuario = req.params.id;
      const newPassword = req.body.newPassword;
      const hashPassword = encodePassword(newPassword);

      await Usuario.updateUserPassword(id_usuario, hashPassword)
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

  app.delete(
    "/private/deleteAccount/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const id_usuario = req.params.id;

      await Usuario.deleteUser(id_usuario)
        .then((result) => {
          if (result) {
            res.json({ message: "Usuário deletado com sucesso" });
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
