import { SSTConfig } from "sst";
import { Api } from "./stacks/Api.js";
import { Database } from "./stacks/Database.js";

if (!process.env.AWS_REGION) {
  throw Error('No process.env.AWS_REGION');
}

// We better set both AWS_REGION and AWS_DEFAULT_REGION to the same value
// https://stackoverflow.com/questions/59961939/what-is-the-difference-between-aws-default-region-and-aws-region-system-variable#:~:text=They%20are%20not%20the%20same,other%20works%20in%20other%20situations.&text=AWS_DEFAULT_REGION%20works%20in%20python%20boto3,but%20that's%20isn't%20true.
process.env.AWS_DEFAULT_REGION = process.env.AWS_REGION;

export default {
  config() {
    return {
      name: "quizzy-match-api",
      // Although specifying the region is optional, if we do not provide the region, we will encounter this error when running the web development server:
      // Trace: Error: Only root constructs may have an empty ID
      region: process.env.AWS_REGION,
    };
  },
  stacks(app) {
    app
      .stack(Database)
      .stack(Api)
  }
  // eslint-disable-next-line
} satisfies SSTConfig;
