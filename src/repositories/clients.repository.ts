export interface Client {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
}

export interface CreateClientDTO {
  name: string;
  age: number;
  isActive: boolean;
}

export interface UpdateClientDTO {
  name?: string;
  age?: number;
  isActive?: boolean;
}


export interface ClientsRepository {
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  insert(clientData: CreateClientDTO): Promise<Client | null>;
  update(id: number, clientData: UpdateClientDTO): Promise<Client | null>;
  delete(id: number): Promise<void>;
}


