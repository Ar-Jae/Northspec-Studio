export async function GET() {
  return Response.json(
    {
      status: 'ok',
      service: 'northspec-frontend',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
