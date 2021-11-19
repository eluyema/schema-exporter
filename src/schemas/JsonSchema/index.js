import { cassandraToJsonShema } from "./cassandraMapper/cassandra";

class JsonSchema {
  constructor() {
    this.schema = {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
    };
  }
  getSchemaByCassandra(table) {
    const { tableName: title } = table;
    this.schema.title = title;
    let properties = {};
    table.columns.forEach((column) => {
      const testRecord = table.testRecord
        ? table.testRecord[column.name]
        : null;
      properties = Object.assign(
        properties,
        cassandraToJsonShema(column, testRecord)
      );
    });
    this.schema.properties = properties;
    return this.schema;
  }
}

export default JsonSchema;
