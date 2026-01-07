import type {
  ClientsRepository,
  CreateClientDTO,
  UpdateClientDTO,
} from "../repositories/clients.repository";

export class ClientsService {
  constructor(private readonly repo: ClientsRepository) { }

  async findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const client = await this.repo.findById(id);
    if (!client) throw new Error(`Post with id: ${id} not found`);
    return client;
  }

  async insert(clientData: CreateClientDTO) {
    const client = await this.repo.insert(clientData);
    if (!client) throw new Error("Cannot create the client");
    return client;
  }

  async update(id: number, clientData: UpdateClientDTO) {
    const client = await this.repo.update(id, clientData);
    if (!client) throw new Error("Cannot update the client");
    return client;
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }
}
