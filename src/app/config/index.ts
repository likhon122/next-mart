const publicBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const recaptchaClientKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY || "your-default-client-key";

const recaptchaServerKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY || "your-default-server-key";

export { publicBaseUrl, recaptchaClientKey, recaptchaServerKey };
