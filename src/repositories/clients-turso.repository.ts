import { turso } from "../../turso";
import type {
  Client,
  ClientsRepository,
  CreateClientDTO,
  UpdateClientDTO,
} from "./clients.repository";

export class ClientsTursoRepository implements ClientsRepository {

  async findAll(): Promise<Client[]> {
    const res = await turso.execute(
      "SELECT id, name, age, isActive FROM clients ORDER BY id DESC;",
    );
    return res.rows as unknown as Client[];
  }

  async findById(id: number): Promise<Client | null> {
    const res = await turso.execute({
      sql: "SELECT id, name, age, isActive FROM clients WHERE id = ?;",
      args: [id],
    });
    return res.rows.length ? (res.rows[0] as unknown as Client) : null;
  }

  async insert(clientData: CreateClientDTO): Promise<Client | null> {
    try {
      const res = await turso.execute({
        sql: "INSERT INTO clients(name, age, isActive) VALUES (?, ?, ?) RETURNING id, name, age, isActive",
        args: [clientData.name, clientData.age, clientData.isActive],
      });
      return res.rows.length ? (res.rows[0] as unknown as Client) : null;
    } catch {
      return null;
    }
  }

  async update(id: number, clientData: UpdateClientDTO): Promise<Client | null> {
    const fields = [];
    const args = [];
    const { name, age, isActive } = clientData;
    if (name !== undefined) {
      fields.push('name = ?');
      args.push(name);
    }
    if (age !== undefined) {
      fields.push('age = ?');
      args.push(age);
    }
    if (isActive !== undefined) {
      fields.push('isActive = ?');
      args.push(isActive);
    }
    if (fields.length == 0)
      return null;
    const sql = `UPDATE clients SET ${fields.join(', ')} WHERE id = ? RETURNING id, name, age, isActive;`;
    args.push(id);
    try {
      const res = await turso.execute({ sql, args });
      return res.rows.length? (res.rows[0] as unknown as Client) : null;
    } catch (err){
      console.log(err);
      return null;
    }
      
  }

  async delete(id: number): Promise<void> {
    await turso.execute({
      sql: 'DELETE FROM clients WHERE id=?;',
      args: [id],
    });
  }
}
