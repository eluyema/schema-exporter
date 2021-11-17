import { writeJsonFile } from "write-json-file";
import cassandra from "cassandra-driver";
import config from "./config.js";

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  config.username,
  config.password
);

const client = new cassandra.Client({
  contactPoints: [`${config.host}:${config.port}`],
  localDataCenter: config.localDataCenter,
  authProvider,
});

const query = "SELECT * FROM system_schema.keyspaces;";
client.execute(query, (err, result) => {
  writeJsonFile("result.json", result);
  console.log("END!");
  err;
});
