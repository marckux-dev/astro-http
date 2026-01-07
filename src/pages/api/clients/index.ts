import type { APIRoute } from "astro";
import { parseJsonBody } from "../../../lib/parseJsonBody";
import { createClientsService } from "../../../services/container";
import type { CreateClientDTO } from "../../../repositories/clients.repository";


export const GET: APIRoute = async () => {
  const service = createClientsService();
  const clients = await service.findAll();
  return new Response(
    JSON.stringify({
      clients
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  
};

export const POST: APIRoute = async ({ request }) => {
  const service = createClientsService();
  const bodyResult = await parseJsonBody<CreateClientDTO>(request);
  if (!bodyResult.ok) {
    return bodyResult.response;
  }
  const { data } = bodyResult;
  try {
    const client = await service.insert(data as CreateClientDTO);
    if (!client) throw new Error('Cannot insert new client');
    return new Response(
      JSON.stringify(client),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message}),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
