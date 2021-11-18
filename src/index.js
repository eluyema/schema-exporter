import dse from "cassandra-driver";
import Cassandra from "./Cassandra/cassandra.js";
import config from "./config.js";

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
  console.log(res);
});
