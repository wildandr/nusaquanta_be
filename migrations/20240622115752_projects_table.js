exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.increments("id").primary();
    table.string("project_name", 255);
    table.string("thumbnail", 255);
    table.dateTime("created_at", { precision: 6 });
    table.dateTime("updated_at", { precision: 6 });
    table.dateTime("published_at", { precision: 6 });
    table.integer("created_by_id").unsigned();
    table.integer("updated_by_id").unsigned();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
