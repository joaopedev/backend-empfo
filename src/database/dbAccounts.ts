import { UserModel } from "../model/model";
import { knex } from "../connectDB";

export class Conta {
  public static async getUsers(
    id_usuario?: string | undefined
  ): Promise<UserModel[]> {
    let sql = knex("usuarios").select("*").orderBy("id");
    if (id_usuario) sql.where("id_usuario", id_usuario);
    return sql;
  }

  public static async getUserById(id: string): Promise<UserModel | null> {
    const user = await knex("usuarios").select("*").where("id", id).first();

    return user || null;
  }

  public static async forgotPassword(
    email: string,
    token: string
  ): Promise<UserModel | null> {
    const user = await knex("usuarios")
      .select("*")
      .where("passwordResetToken", token)
      .where("email", email)
      .first();

    return user || null;
  }

  public static async getUserByEmail(email: string): Promise<UserModel | null> {
    const user = await knex("usuarios")
      .select("*")
      .where("email", email)
      .first();

    return user || null;
  }

  public static async updateUserPassword(
    id_usuario: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await knex("usuarios")
      .where("id", id_usuario)
      .update({ password: newPassword });

    return user > 0;
  }

  public static async deleteUser(id_usuario: string): Promise<boolean> {
    const user = await knex("usuarios")
      .select("usuarios")
      .where("id", id_usuario)
      .delete();

    return user > 0;
  }
}
