export async function GET() {
  const response = await fetch('http://0.0.0.0:8006/user?role=doctor').then(
    (res) => res.json(),
  );
  return Response.json(response.data);
}
