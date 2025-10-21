import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["PORT", "DATABASE_URL", "JWT_SECRET", "JWT_EXPIRES_IN", "FRONTEND_URL"] as const;

type RequiredEnv = (typeof requiredEnvVars)[number];

type EnvConfig = Record<RequiredEnv, string> & {
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
};

const env: EnvConfig = requiredEnvVars.reduce((acc, key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  acc[key] = value;
  return acc;
}, {} as EnvConfig);

if (process.env.SMTP_HOST) {
  env.smtpHost = process.env.SMTP_HOST;
  env.smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  env.smtpUser = process.env.SMTP_USER;
  env.smtpPass = process.env.SMTP_PASS;
}

export default env;
