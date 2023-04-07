import Item from "../models/Item";
import database from "./database";

const itensRepository = {
  create: (item: Item, callback: (id?: number) => void) => {
    const sql: string = "INSERT INTO itens (name, description) VALUES (?,?)";
    const params: string[] = [item.name, item.description];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  readAll: (callback: (itens: Item[]) => void) => {
    const sql: string = "SELECT * FROM itens";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows));
  },
  read: (id: number, callback: (item?: Item) => void) => {
    const sql: string = "SELECT * FROM itens WHERE id = ?";
    const params: number[] = [id];
    database.get(sql, params, (_err, row) => callback(row));
  },
  update: (id: number, item: Item, callback: (notFound: boolean) => void) => {
    const sql: string =
      "UPDATE itens SET name = ?, description = ? WHERE id = ?";
    const params: any[] = [item.name, item.description, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  exclude: (id: number, callback: (notFound: boolean) => void) => {
    const sql: string = "DELETE FROM itens WHERE id = ?";
    const params: number[] = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};

export default itensRepository;
