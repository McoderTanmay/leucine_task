import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: 'User',
    tableName: 'users',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'string',
            unique: true
        },
        password: {
            type: "string",
        },
        role: {
            type: "enum",
            enum: ['employee', 'manager', 'admin'],
            default: 'employee'
        }
    }
})