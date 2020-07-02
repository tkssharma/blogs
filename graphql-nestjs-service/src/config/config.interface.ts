/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  type: string;
  user: string;
  pass: string;
  name: string;
  host: string;
  port: number;
  dialect: string;
  charset: string;
  collate: string;
}
export interface ConfigJwtData {
  secret?: string | Buffer;
  issuer?: string;
  expiration?: string;
}
export interface RedisConfig {
  host: string;
  port: number;
  db: number;
  password: string;
  keyPrefix: string;
}
/**
 * Configuration data for the app.
 */
export interface ConfigData {
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  redis: RedisConfig;
}
