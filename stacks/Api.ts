import { use, StackContext, Api as ApiGateway } from "sst/constructs";
import { Database } from "./Database.js";
import { fetchOutputs } from "./helpers/fetchOutputs.js";
import { writeClientEnvFile } from "./helpers/writeClientFile.js";

// TODO: Break client cache by server response header
export async function Api({ stack }: StackContext) {
  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [use(Database)],
        runtime: "nodejs18.x",
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler",
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm",
            "cp packages/graphql/schema.graphql packages/client/lib/schema.graphql",
          ],
        },
      },
    },
  });
  stack.addOutputs({
    API: api.url,
  });
  stack.exportValue(api.url, { name: "API" });
  const values = await fetchOutputs(stack, ["API"]);
  writeClientEnvFile({ API_BASE_URL: values.API });
  return api;
}
