import { UserModel } from "../model/model";
import { knex } from "../connectDB";

export class Conta {
  public static async cadastrarConta(
    conta: UserModel
  ): Promise<boolean> {
    return knex("contas").insert(conta);
  }

  public static async getContas(
    id_usuario?: string | undefined
  ): Promise<UserModel[]> {
    let sql = knex("contas").select("*").orderBy("id");
    if (id_usuario) sql.where("id_usuario", id_usuario);
    return sql;
  }
}
