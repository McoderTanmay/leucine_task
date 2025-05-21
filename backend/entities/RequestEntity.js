import { EntitySchema } from "typeorm";
import { User } from "./User.js";
import { Software } from "./SoftwareEntity.js"

export const Request = new EntitySchema({
  name: "Request",
  tableName: "request",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    accessType: {
      type: "enum",
      enum: ["Read", "Write", "Admin"],
    },
    reason: {
      type: "text",
    },
    status: {
      type: "enum",
      enum: ["Pending", "Approved", "Rejected"],
    },
  },
  relations:{
    user:{
        type:"many-to-one",
        target:"User",
        joincolumn: true,
        eager: true
    },
    software: {
      type: 'many-to-one',
      target: 'Software',
      joinColumn: true,
      eager: true,
    },
  }
});
