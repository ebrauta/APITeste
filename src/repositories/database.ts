import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

const SQL_ITENS_CREATE = `CREATE TABLE itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
)`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log("Base de Dados conectada com sucesso!");
    database.run(SQL_ITENS_CREATE, (err) => {
      if (err) {
        //Possivelmente tabela já foi criada
      } else {
        console.log("Tabela itens criada com sucesso");
      }
    });
  }
});

export default database;
