class Cassandra {
  constructor(db) {
    try {
      this.client = db;
    } catch (err) {
      console.error(err);
    }
  }
  async getAllTableNames(keyspace) {
    try {
      const query = `SELECT table_name FROM system_schema.tables WHERE keyspace_name = '${keyspace}';`;
      const { rows: rawTableNames } = await this.client.execute(query);
      return rawTableNames.map((row) => row.table_name);
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async getAllCassandraTables(keyspace) {
    try {
      const tableNames = await this.getAllTableNames(keyspace);
      const cassandraTables = [];
      for (const name of tableNames) {
        const query = `SELECT * from ${keyspace}.${name} limit 1 ;`;
        const rawResult = await this.client.execute(query);
        cassandraTables.push({
          tableName: name,
          columns: rawResult.columns,
          rowExample: rawResult.rows[0],
        });
      }
      return cassandraTables;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

export default Cassandra;
