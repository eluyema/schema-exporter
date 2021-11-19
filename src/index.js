import dse from "cassandra-driver";
import Cassandra from "./databases/Cassandra";
import config from "./config.js";
import { cassandraToJsonShema } from "./schemas/JsonSchema/cassandraMapper/cassandra";

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
cassandra.getAllCassandraTables(config.keyspace).then((res) => {
  res.forEach((table) => {
    if (table.tableName === "cyclist_teams") {
      const value = table.rowExample
        ? table.rowExample[table.columns[3].name]
        : null;
      console.log("\n\n\n\n\n", cassandraToJsonShema(table.columns[3], value));
    }
  });
});
