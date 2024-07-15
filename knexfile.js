module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db.sqlite",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "mysql",
    connection: {
      host: "localhost",
      database: "nusaquanta-be-test",
      user: "root",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: "localhost",
      database: "my_db",
      user: "root",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
