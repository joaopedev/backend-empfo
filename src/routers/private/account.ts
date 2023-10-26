import { HTTP_ERRORS } from "../../model/model";
import createError from "http-errors";
import { Conta } from "../../database/dbAccounts";
import { Application, NextFunction, Request, Response } from "express";
import { encodePassword } from "../../utils/bcrypt";

export = (app: Application) => {
  app.post(
    "/private/account",
    (req: Request, res: Response, next: NextFunction) => {
      let conta = req.body;

      Conta.cadastrarConta(conta)
        .then((conta) => {
          res.json({ message: "Conta cadastrada com sucesso", conta: conta });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
        });
    }
  );

  app.get(
    "/private/account",
    (req: Request, res: Response, next: NextFunction) => {
      let id_usuario = <string>req.query.id_usuario;

      Conta.getUsers(id_usuario)
        .then((contas) => {
          res.json({
            message: "contas recuperadas com sucesso",
            contas: contas,
          });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
        });
    }
  );

  app.get(
    "/private/accountById/:id",
    (req: Request, res: Response, next: NextFunction) => {
      let id_usuario = req.params.id; 
  
      Conta.getUserById(id_usuario)
        .then((contas) => {
          res.json({
            message: "contas recuperadas com sucesso",
            contas: contas,
          });
        })
        .catch((erro) => {
          next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
        });
    }
  );

  app.put('/private/updateAccount/:id', (req: Request, res: Response, next: NextFunction) => {
    const id_usuario = req.params.id;
    const newPassword = req.body.newPassword;
    const hashPassword = encodePassword(newPassword)
  
    Conta.updateUserPassword(id_usuario, hashPassword)
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
  });

  app.put('/private/forgotWithToken/:token', (req: Request, res: Response, next: NextFunction) => {
    const id_usuario = req.params.id;
    const newPassword = req.body.newPassword;
    const hashPassword = encodePassword(newPassword)
  
    Conta.updateUserPassword(id_usuario, hashPassword)
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
  });

  app.delete('/private/deleteAccount/:id', (req: Request, res: Response, next: NextFunction) => {
    const id_usuario = req.params.id; 
  
    Conta.deleteUser(id_usuario)
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
  });
};
