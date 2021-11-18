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
      const query = `SELECT * from ${keyspace}.developers ;`;
      // const { rows: rawTableNames } = await this.client.execute(query);
      // return rawTableNames.map((row) => row.table_name);
      const result = await this.client.execute(query);
      console.log(result.columns[5].type.info);
      return result;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
  async getAllCassandraTables(keyspace) {
    try {
      const tableNames = await this.getAllTableNames(keyspace);
      const cassandraTables = [];
      console.log(tableNames);
      tableNames.forEach(async (name) => {
        const query = `SELECT * FROM system_schema.columns WHERE keyspace_name = '${keyspace}' AND table_name = '${name}';`;
        const result = await this.client.execute(query);
        console.log(result);
      });
      return cassandraTables;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

export default Cassandra;
