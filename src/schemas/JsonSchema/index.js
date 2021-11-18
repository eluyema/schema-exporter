class JsonSchema {
  constructor() {
    this.schema = {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
    };
  }
  getSchemaByCassandraTable(table) {
    const { tableName: title } = table;
    this.schema.title = title;
    this.schema.properties = {};
    return this.schema;
  }
}

export default JsonSchema;
