import { HTTP_ERRORS } from "../../model/model";
import createError from "http-errors";
import { Conta } from "../../database/accounts";
import { Application, NextFunction, Request, Response } from "express";

export = (app: Application) => {
  app.post(
    "/private/conta",
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
    "/private/conta",
    (req: Request, res: Response, next: NextFunction) => {
      let id_usuario = <string>req.query.id_usuario;

      Conta.getContas(id_usuario)
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
};
