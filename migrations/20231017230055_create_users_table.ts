import { Knex } from "knex";
import { onUpdateTrigger } from "../src/utils/onUpdateTrigger";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("usuarios", function(table){
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).unique();
        table.string("email", 320).notNullable().index().unique();
        table.string("name", 255).notNullable();
        table.string("password", 255).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.string('passwordResetToken');
        table.timestamp('passwordResetExpires');
    }).then(()=>{
        knex.raw(onUpdateTrigger("usuarios"))
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("usuarios");
}

