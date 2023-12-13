import Dexie from "dexie";

export const db = new Dexie("myDb");
db.version(1).stores({
  links: "++id, objects",
});
