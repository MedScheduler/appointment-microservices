export async function POST(request: Request) {
  const body = await request.formData();
  const email = body.get('email');
  const password = body.get('password');

  const response = await fetch('http://0.0.0.0:8006/auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

  if (response.error) {
    return Response.json({ error: 'Unauthorized' });
  }
  return Response.json(response.data);
}
