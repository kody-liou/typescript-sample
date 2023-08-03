import fs from "fs";

export const writeClientEnvFile = (envContent: Record<string, string>) => {
  fs.writeFileSync(
    "packages/client/.env.local.json",
    JSON.stringify(envContent, null, 2),
  );
};
