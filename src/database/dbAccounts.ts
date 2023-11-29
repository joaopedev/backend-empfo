import { UserModel } from "../models/model";
import { knex } from "../connectDB";

export class Usuario {
  public static async getUsers(
    id?: string | undefined
  ): Promise<UserModel[]> {
    let sql = knex("usuarios").select("*").orderBy("id");
    if (id) sql.where("id", id);
    return sql;
  }

  public static async getUserById(id: string): Promise<UserModel | null> {
    const user = await knex("usuarios").select("*").where("id", id).first();

    return user || null;
  }

  public static async updateForgotPassword(
    token: string
  ): Promise<number | null> {
    const user = await knex("usuarios")
      .select("*")
      .where("passwordResetToken", token)
      .first();

    return user || null;
  }

  public static async resetUserPassword(
    email: string,
    newPassword: string
  ): Promise<boolean> {
    const user = await knex("usuarios")
      .where("email", email)
      .update({ password: newPassword });

    return user > 0;
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
