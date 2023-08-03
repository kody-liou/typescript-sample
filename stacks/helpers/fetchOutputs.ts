import AWS from "aws-sdk";
import { Stack } from "sst/constructs";

// Fetch the API value and write it to .env.local.json
export async function fetchOutputs(stack: Stack, outputKeys: string[]) {
  const cloudFormation = new AWS.CloudFormation({
    region: process.env.AWS_REGION
  });
  // for (const [key, value] of Object.entries(exportVariables)) {
  //   stack.exportValue(value, { name: key });
  // }
  const response = await cloudFormation
    .describeStacks({ StackName: stack.stackName })
    .promise();
  const stackInfo = response.Stacks && response.Stacks[0];
  const outputRecord: Record<string, string> = {};
  // const outputKeys = Object.keys(exportVariables);
  for (const output of stackInfo?.Outputs ?? []) {
    if (!output.OutputKey || !output.OutputValue) {
      continue;
    }
    if (outputKeys.includes(output.OutputKey)) {
      outputRecord[output.OutputKey] = output.OutputValue;
    }
  }
  return outputRecord;
}
