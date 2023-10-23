import { knex } from "../connectDB";
import { UserModel } from "../model/model"
import nodemailer from 'nodemailer';
const crypto = require('crypto'); 

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

  public static async forgotPassword(email: string): Promise<boolean> {
    try {
      const user = await knex('usuarios').where('email', email).first();

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await knex('usuarios')
        .where('id', user.id)
        .update({
          passwordResetToken: resetToken,
          passwordResetExpires: now,
        });

      const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
          user: 'seu_email@example.com',
          pass: 'sua_senha_do_email',
        },
      });

      const mailOptions = {
        from: 'seu_email@example.com',
        to: email,
        subject: 'Recuperação de Senha',
        html: `<p>Olá ${user.nome},</p>
        <p>Você solicitou a redefinição da sua senha. Clique no link abaixo para criar uma nova senha:</p>
        <p><a href="http://seu_site.com/resetPassword/${resetToken}">Redefinir Senha</a></p>
        <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>`,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      throw new Error('Erro ao enviar o e-mail de recuperação de senha');
    }
  }
}
