export async function GET() {
  return Response.json({
    publicKey:   process.env.VAPI_PUBLIC_KEY,
    assistantId: process.env.VAPI_ASSISTANT_ID,
  });
}
