export interface IPayloadToken {
    username: string;
    role: string;
  }
  
  export interface IAuthBody {
    usuario: string;
    password: string;
  }
  
  export interface IAuthTokenResult {
    role: string;
    username: string;
    iat: number;
    exp: number;
  }
  
  export interface IUseToken {
    role: string;
    username: string;
    isExpired: boolean;
  }
  