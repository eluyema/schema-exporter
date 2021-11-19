import dse from "cassandra-driver";
import Cassandra from "./databases/cassandra";
import config from "./config.js";
import JsonSchema from "./schemas/jsonschema";
import { writeJsonFile } from "write-json-file";

const authProvider = new dse.auth.PlainTextAuthProvider(
  config.username,
  config.password
);

const client = new dse.Client({
  contactPoints: [`${config.host}:${config.port}`],
  localDataCenter: config.localDataCenter,
  authProvider,
  keyspace: config.keyspace,
});

const cassandra = new Cassandra(client);
cassandra
  .getAllCassandraTables(config.keyspace)
  .then((tables) => {
    console.log(
      "\n\nThe tables from Cassandra have been successfully received," +
        " now I will think about how to convert the types to the JsonSchema correctly ...\n\n"
    );
    writeJsonFile(
      "result.json",
      tables.map((table) => {
        const schema = new JsonSchema();
        return schema.getSchemaByCassandra(table);
      })
    ).then(() => {
      console.log("result.json have been successfully composed\n\n");
    });
  })
  .catch((err) => console.error(err));
