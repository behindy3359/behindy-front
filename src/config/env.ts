interface EnvConfig {
  API_URL: string;
  AI_URL: string;

  DEV_MODE: boolean;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';

  APP_NAME: string;
  APP_VERSION: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
    
  if (value !== undefined && value !== '') return value;
  if (defaultValue !== undefined) return defaultValue;
  
  throw new Error(`Missing required environment variable: ${key}`);
}

function getBooleanEnv(key: string, defaultValue: boolean = false): boolean {
  const value = getEnvVar(key, defaultValue.toString());
  return value.toLowerCase() === 'true';
}

export const env: EnvConfig = (() => {
  try {
    const config = {
      API_URL: getEnvVar('NEXT_PUBLIC_API_URL', 'https://behindy.me/api'),
      AI_URL: getEnvVar('NEXT_PUBLIC_AI_URL', 'https://behindy.me/ai'),

      DEV_MODE: getBooleanEnv('NEXT_PUBLIC_DEV_MODE', false),
      LOG_LEVEL: (getEnvVar('NEXT_PUBLIC_LOG_LEVEL', 'info') as EnvConfig['LOG_LEVEL']),

      APP_NAME: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Behindy'),
      APP_VERSION: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),
    };

    return config;
  } catch (error) {
    console.error('Failed to load environment configuration:', error);
    throw error;
  }
})();

export default env;