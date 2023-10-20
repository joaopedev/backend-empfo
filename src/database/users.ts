import { knex } from "../connectDB";
import { UserModel } from "../model/model"

export class Usuario {
  public static loginUser(email: string, senha: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      knex("usuarios")
        .select("*")
        .where("email", email)
        .andWhere("password", senha)
        .then((usuario) => {
          if (usuario.length > 0) {
            resolve(usuario[0]);
          } else {
            reject("Nenhum usuario encontrado");
          }
        })
        .catch((erro) => {
          reject(erro);
        });
    });
  }

  public static createUser(email: string, password: string): Promise<boolean> {
    const user: UserModel = {email, password}
    return knex("usuarios").insert(user)  
  }
}
