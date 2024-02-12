export interface IPayloadToken {
    sub: string;
    role: string;
  }
  
  export interface IAuthBody {
    usuario: string;
    password: string;
  }
  
  export interface IAuthTokenResult {
    role: string;
    sub: string;
    iat: number;
    exp: number;
  }
  
  export interface IUseToken {
    role: string;
    sub: string;
    isExpired: boolean;
  }
  