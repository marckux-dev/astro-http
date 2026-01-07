export type BodyResult<T> = 
  | { ok: true, data: T} 
  | { ok: false, response: Response}
;

export const parseJsonBody = async <T> ( request: Request ): Promise<BodyResult<T>> => {
  if (!request.headers.get('content-type')?.includes('application/json'))
    return ({
      ok: false,
      response: new Response(
        JSON.stringify({ error: 'Content-Type must be application/json', }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', },
        },
      ),
    });

  let data: unknown;
  
  try {
    data = await request.json();
  } catch {
    return ({
      ok: false,
      response: new Response(
        JSON.stringify({ error: 'Invalid or empty JSON body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', }
        },
      )
    });
  }
  
  if (
       !data
    || typeof data !== 'object'
    || Array.isArray(data)
    || Object.keys(data).length === 0
  )
    return ({
      ok: false,
      response: new Response(
        JSON.stringify({ error: 'Request body is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' }}
      ),
    });

  return ({
    ok: true,
    data: data as T,
  });
  
};
