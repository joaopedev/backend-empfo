export enum HTTP_ERRORS {
    ERRO_BANCO = 402,
    ACESSO_NAO_AUTORIZADO = 401,
    ROTA_NAO_ENCONTRADA = 404,
    SOLICITACAO = 550, // Error in the request sent by the app
    ERRO_INTERNO = 500, // Unmapped error
    ERRO_API_EXTERNA = 403, // Error when performing an external request
  }
  
  export interface UserModel {
    id?: string;
    email: string;
    password: string;
  }
  
  export enum ErrosBDModel {
    UNIQUE_VIOLATION = 23505,
  }
  