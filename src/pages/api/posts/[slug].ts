import { getEntry } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ( { params }) => {
  const { slug } = params;
  if (!slug)
    return new Response(
      JSON.stringify({ error: 'Slug no propocionado',}),
      {
        status: 400,
      },
    );
  const post = await getEntry('blog', slug);
  if (!post)
    return new Response(
      JSON.stringify({ error: 'Slug no encontrado',}),
      {
        status: 404,
      }
    );
  return new Response(
    JSON.stringify(post),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }, 
  );
}
