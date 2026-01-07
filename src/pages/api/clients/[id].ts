import type { APIRoute } from "astro";
import { parseJsonBody } from "../../../lib/parseJsonBody";
import { createClientsService } from "../../../services/container";
import type { UpdateClientDTO } from "../../../repositories/clients.repository";

export const GET: APIRoute = async ({ params }) => {
  const service = createClientsService();
  const id = params.id;
  try {
    const client = await service.findById(+id!);
    if (!client) throw new Error("Client not found");
    return new Response(JSON.stringify(client), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const service = createClientsService();
  const id = params.id;
  const bodyResult = await parseJsonBody<UpdateClientDTO>(request);
  if (!bodyResult.ok) {
    return bodyResult.response;
  }
  const { data } = bodyResult;

  try {
    const client = await service.update(+id!, data);
    if (!client) throw new Error("Cannot update the client");
    return new Response(
      JSON.stringify({
        client,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: (err as Error).message,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const id = params.id;
  return new Response(
    JSON.stringify({
      method: "DELETE",
      message: `Delete the client with id: ${id}`,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
