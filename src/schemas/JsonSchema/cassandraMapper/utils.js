import { CassandraTypes } from "../../../common/enum/cassandra";
import { JsonSchemaTypes } from "../../../common/enum/jsonschema/types";
import { cassandraToJsonShema } from "./cassandra";

export function getFromCassandraCollection(collection) {
  if (Array.isArray(collection)) return collection[0];
  else if (typeof collection === "object" && collection !== null)
    return [Object.keys(collection)[0], Object.values(collection)[0]];
  throw "Received function argument is not a collection";
}

export function getUDTResult(udtFields, testRecord) {
  const type = JsonSchemaTypes.Object;
  let property = {};
  udtFields
    .map((nextCol) => cassandraToJsonShema(nextCol, testRecord))
    .forEach((prop) => {
      property = Object.assign(property, prop);
    });
  return { type, property };
}

export function getCollectionResult(column, testRecord, collectionInfo) {
  let result = { type: JsonSchemaTypes.Array };
  const subRecord = testRecord
    ? getFromCassandraCollection(testRecord)
    : testRecord;
  if (CassandraTypes.udt === column.code) {
    column.info.name = null;
    result = cassandraToJsonShema(
      collectionInfo,
      testRecord ? subRecord[0] : testRecord
    );
  } else if (Array.isArray(collectionInfo)) {
    result.items = collectionInfo.map((nextCol, i) =>
      cassandraToJsonShema(nextCol, testRecord ? subRecord[i] : testRecord)
    );
  } else {
    result.items = cassandraToJsonShema(
      collectionInfo,
      testRecord ? subRecord[0] : testRecord
    );
  }
  return result;
}
