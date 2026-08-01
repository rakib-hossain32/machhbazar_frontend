interface EnvVars {
  APP_NAME: string;
  APP_URL: string;
  API_URL: string;
  BETTER_AUTH_URL: string;
  JWT_ACCESS_SECRET: string;
}

const loadEnvVars = (): EnvVars => {
  const publicEnv = {
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  };

  const missingPublicVars = [
    ["NEXT_PUBLIC_APP_NAME", publicEnv.APP_NAME],
    ["NEXT_PUBLIC_APP_URL", publicEnv.APP_URL],
    ["NEXT_PUBLIC_API_URL", publicEnv.API_URL],
    ["NEXT_PUBLIC_BETTER_AUTH_URL", publicEnv.BETTER_AUTH_URL],
  ];

  for (const [varName, value] of missingPublicVars) {
    if (!value) {
      console.warn(
        `Environment variable ${varName} is not set. Using default value.`,
      );
    }
  }

  if (typeof window === "undefined" && !process.env.JWT_ACCESS_SECRET) {
    console.warn(
      "Server-only environment variable JWT_ACCESS_SECRET is not set.",
    );
  }

  return {
    APP_NAME: publicEnv.APP_NAME || "App Name",
    APP_URL: publicEnv.APP_URL || "http://localhost:3000",
    API_URL: publicEnv.API_URL || "http://localhost:5000/api",
    BETTER_AUTH_URL: publicEnv.BETTER_AUTH_URL || "http://localhost:5000",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  };
};

export const envVars = loadEnvVars();
