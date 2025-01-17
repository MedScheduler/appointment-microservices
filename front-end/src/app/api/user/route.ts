export async function GET(request: Request) {
  const response = await fetch('http://0.0.0.0:8006/user/1').then((res) =>
    res.json(),
  );
  return Response.json(response.data);
}

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  const body = {
    name,
    email,
    password,
    role,
  };

  const response = await fetch('http://0.0.0.0:8006/user', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log(response);

  return Response.json(response);
}
