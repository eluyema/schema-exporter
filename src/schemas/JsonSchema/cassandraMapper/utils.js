export function getFirstRecordFromCassandraCollection(collection) {
  if (Array.isArray(collection)) return collection[0];
  else if (typeof collection === "object" && collection !== null)
    return [Object.keys(collection)[0], Object.values(collection)[0]];

  console.log(collection);
  throw "Received function argument is not a collection";
}
