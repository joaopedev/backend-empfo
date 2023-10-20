import { HTTP_ERRORS } from "../../model/model";
import createError from "http-errors";
import { Usuario } from "../../database/users";
import { Application, NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
require("dotenv").config();

export = (app: Application) => {
    app.post(
      "/login",
      body("email").notEmpty(), // Use notEmpty() para garantir que não seja nulo
      body("password").exists(),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
  
        if (errors.isEmpty()) {
          const email = req.body.email;
          const password = req.body.password;
          
          if (email) {
            // Verificar se o email não é nulo
            const emailValido = email
            
            if (emailValido) {
              Usuario.loginUser(emailValido, password)
                .then((usuario) => {
                  res.json({
                    message: "usuário logado",
                    usuario: usuario,
                  });
                })
                .catch((erro) => {
                  console.error(erro)
                  next(createError(HTTP_ERRORS.ERRO_BANCO, erro));
                });
            } else {
              next(createError(HTTP_ERRORS.ERRO_BANCO, "Email inválido"));
            }
          } else {
            next(createError(HTTP_ERRORS.ERRO_BANCO, "Email não pode ser nulo"));
          }
        } else {
          next(
            createError(HTTP_ERRORS.SOLICITACAO, JSON.stringify(errors.array()))
          );
        }
      }
    );
  };
