import { cassandraToJsonTypeMap } from "../../../common/enum/jsonschema/map";
import { getCollectionResult, getUDTResult } from "./utils";
import isJSON from "is-json";
import { CassandraSerializableTypes } from "../../../common/enum/cassandra";
import toJsonSchema from "to-json-schema";

export const cassandraToJsonShema = (column, testRecord) => {
  let result = {};
  const collectionInfo =
    Object.prototype.hasOwnProperty.call(column, "info") && column.info;
  const udtFields =
    Object.prototype.hasOwnProperty.call(column, "fields") && column.fields;
  if (udtFields) {
    result = getUDTResult(udtFields, testRecord);
  } else if (collectionInfo) {
    result = getCollectionResult(column, testRecord, collectionInfo);
  } else if (column.type) {
    result = cassandraToJsonShema(column.type, testRecord);
  } else if (CassandraSerializableTypes[column.code] && isJSON(testRecord)) {
    result = toJsonSchema(JSON.parse(testRecord));
  } else result.type = cassandraToJsonTypeMap[column.code];
  if (column.name) {
    return { [column.name]: result };
  }
  return result;
};
