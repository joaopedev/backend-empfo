import { knex } from "../connectDB";
import { UserModel } from "../models/model";
import nodemailer from "nodemailer";
import { generateToken, comparePasswords } from "../utils/bcrypt";

export class UserLogin {
  public static loginUser(email: string, senha: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      knex("usuarios")
        .select("*")
        .where("email", email)
        .then((usuarios) => {
            if (usuarios.length > 0) {
              const usuario: UserModel = usuarios[0];
              if (comparePasswords(senha, usuario.password)) {
                resolve(usuario);
              } else {
                reject("Senha inválidas");
              }
            } else {
              reject("Nenhum usuário encontrado");
            }
          
        })
        .catch((erro) => {
          reject(erro);
        });
    });
  }

  public static async createUser(
    email: string,
    password: string
  ): Promise<UserModel> {
    if (password.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres");
    }

    try {
      const existingUser = await knex("usuarios")
        .where({ email: email })
        .first();

      if (existingUser) {
        throw new Error("Este email já está em uso");
      } else {
        const user: UserModel = { email, password };
        await knex("usuarios").insert(user);
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async forgotPassword(email: string): Promise<boolean> {
    try {
      const user: UserModel = await knex("usuarios")
        .where("email", email)
        .first();

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const resetToken = generateToken();
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await knex("usuarios").where("id", user.id).update({
        passwordResetToken: resetToken,
        passwordResetExpires: now,
      });

      setTimeout(async () => {
        await knex("usuarios").where("id", user.id).update({
          passwordResetToken: null,
          passwordResetExpires: null,
        });
      }, 3600000);

      var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fc21c9c3a78b2a",
          pass: "0d33ae7055934c",
        },
      });

      const mailOptions = {
        from: "noreplay@empfo.com.br",
        to: `${user.email}`,
        subject: "Recuperação de Senha",
        html: `<p>Olá ${user.email},</p>
        <p>Você solicitou a redefinição da sua senha. Utilize este token para recuperar a senha:</p>
        <p>${resetToken}</p>
        <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>`,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      throw new Error("Erro ao enviar o e-mail de recuperação de senha");
    }
  }
}
