import { StackContext, Table } from "sst/constructs";
import { DBKeys, DBGSI } from "@utils/constants.js";

export function Database({ stack }: StackContext) {
  const table = new Table(stack, "db", {
    fields: {
      [DBKeys.pk]: "string",
      [DBKeys.sk]: "string",
      [DBKeys.gsi1pk]: "string",
      [DBKeys.gsi1sk]: "string",
    },
    primaryIndex: {
      partitionKey: DBKeys.pk,
      sortKey: DBKeys.sk,
    },
    globalIndexes: {
      [DBGSI.gsi1]: {
        partitionKey: DBKeys.gsi1pk,
        sortKey: DBKeys.gsi1sk,
      },
    },
  });
  return table;
}
