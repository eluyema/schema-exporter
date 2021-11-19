import { CassandraTypes } from "../../cassandra/types";
import { JsonSchemaTypes } from "../types";
// map for convert common types of cassandra to json schema types

export const cassandraToJsonTypeMap = {
  [CassandraTypes.ascii]: JsonSchemaTypes.String,
  [CassandraTypes.bigint]: JsonSchemaTypes.Integer,
  [CassandraTypes.blob]: JsonSchemaTypes.String,
  [CassandraTypes.boolean]: JsonSchemaTypes.Boolean,
  [CassandraTypes.counter]: JsonSchemaTypes.Integer,
  [CassandraTypes.decimal]: JsonSchemaTypes.Number,
  [CassandraTypes.double]: JsonSchemaTypes.Number,
  [CassandraTypes.float]: JsonSchemaTypes.Number,
  [CassandraTypes.int]: JsonSchemaTypes.Integer,
  [CassandraTypes.text]: JsonSchemaTypes.String,
  [CassandraTypes.timestamp]: JsonSchemaTypes.String,
  [CassandraTypes.uuid]: JsonSchemaTypes.String,
  [CassandraTypes.varchar]: JsonSchemaTypes.String,
  [CassandraTypes.varint]: JsonSchemaTypes.Integer,
  [CassandraTypes.timeuuid]: JsonSchemaTypes.String,
  [CassandraTypes.inet]: JsonSchemaTypes.String,
  [CassandraTypes.date]: JsonSchemaTypes.String,
  [CassandraTypes.time]: JsonSchemaTypes.String,
  [CassandraTypes.smallint]: JsonSchemaTypes.Integer,
  [CassandraTypes.tinyint]: JsonSchemaTypes.Integer,
};
