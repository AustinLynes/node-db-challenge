
exports.up = function (knex) {
    return (
        knex.schema
            .createTable('project', tbl => {
                tbl.increments()
                tbl.string('name').notNullable()
                tbl.string('description')
                tbl.boolean('complete').notNullable().defaultsTo(false)
            })
            .createTable('task', tbl => {
                tbl.increments()
                tbl.string('description').notNullable()
                tbl.string('notes')
                tbl.boolean('complete').notNullable().defaultsTo(false)
                tbl.integer('project_id')
                    .references('id')
                    .inTable('project')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
            .createTable('resource',tbl=>{
                tbl.increments()
                tbl.string('name').notNullable().unique()
                tbl.string('description')
            })
            .createTable('task_resource',tbl=>{
                tbl.integer('resource_id').notNullable()
                tbl.integer('task_id').notNullable()
            })
    )
};

exports.down = function (knex) {
    return (
        knex.schema
            .dropTableIfExists('project')
            .dropTableIfExists('task')
            .dropTableIfExists('resource')
            .dropTableIfExists('task_resource')
    )
};
