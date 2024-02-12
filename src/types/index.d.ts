//NodeJS.ProcessEnv
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DATABASE_URL: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
