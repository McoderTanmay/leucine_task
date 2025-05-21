import { EntitySchema } from "typeorm";

export const Software = new EntitySchema({
  name: "Software",
  tableName: "software",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    accessLevels: {
      type: "simple-array",
    },
  },
});
