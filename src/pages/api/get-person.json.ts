import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const blogs = getCollection('blog');

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(JSON.stringify(blogs), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
