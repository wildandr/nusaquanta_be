exports.up = function (knex) {
  return knex.schema.createTable("people", function (table) {
    table.increments("id").primary();
    table.string("full_name", 255);
    table.text("description", "longtext");
    table.string("github", 255);
    table.string("linkedin", 255);
    table.string("instagram", 255);
    table.string("email", 255);
    table.dateTime("created_at", { precision: 6 });
    table.dateTime("updated_at", { precision: 6 });
    table.dateTime("published_at", { precision: 6 });
    table.integer("created_by_id").unsigned();
    table.integer("updated_by_id").unsigned();
    table.string("website", 255);
    table.string("cv", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("people");
};
