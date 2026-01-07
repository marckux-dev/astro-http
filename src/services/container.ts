import { ClientsTursoRepository } from "../repositories/clients-turso.repository";
import { ClientsService } from "./clients.service";

export const createClientsService = () => new ClientsService(
  new ClientsTursoRepository()
);

 
