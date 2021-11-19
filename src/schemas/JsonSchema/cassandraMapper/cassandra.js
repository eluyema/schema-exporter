import { cassandraToJsonTypeMap } from "../../../common/enum/JsonSchema/map";
import { JsonSchemaTypes } from "../../../common/enum/JsonSchema/types";
import { getFirstRecordFromCassandraCollection } from "./utils";
import isJSON from "is-json";
import { CassandraSerializableTypes } from "../../../common/enum/Cassandra";
import toJsonSchema from "to-json-schema";

export const cassandraToJsonShema = (column, exampleValue) => {
  let result = {};
  console.log("ex", exampleValue);
  const info =
    Object.prototype.hasOwnProperty.call(column, "info") && column.info;
  const fields =
    Object.prototype.hasOwnProperty.call(column, "fields") && column.fields;
  if (fields) {
    result.type = result.type = JsonSchemaTypes.Object;
    let property = {};
    const nextValue = getFirstRecordFromCassandraCollection(exampleValue);
    fields
      .map((nextCol, i) => cassandraToJsonShema(nextCol, nextValue[i]))
      .forEach((prop) => {
        property = Object.assign(property, prop);
      });
    result.property = property;
  } else if (info) {
    result.type = result.type = JsonSchemaTypes.Array;
    const nextValue = getFirstRecordFromCassandraCollection(exampleValue);
    if (Array.isArray(info)) {
      result.items = info.map((nextCol, i) =>
        cassandraToJsonShema(nextCol, nextValue[i])
      );
    } else {
      result.items = cassandraToJsonShema(info, nextValue[0]);
    }
  } else if (column.type) {
    result = cassandraToJsonShema(column.type, exampleValue);
  } else if (CassandraSerializableTypes[column.code] && isJSON(exampleValue)) {
    result = toJsonSchema(JSON.parse(exampleValue));
    console.log(result);
  } else result.type = cassandraToJsonTypeMap[column.code];
  if (column.name) {
    return { [column.name]: result };
  }
  return result;
};
