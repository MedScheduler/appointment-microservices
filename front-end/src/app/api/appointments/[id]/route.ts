export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    'http://0.0.0.0:8000/api/v1/appointments/' + id,
  ).then((res) => res.json());

  return Response.json({ data: response });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { status } = await request.json();

  const body = {
    status,
  };

  const response = await fetch(
    'http://0.0.0.0:8000/api/v1/appointments/' + id,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());

  if (response.message !== 'Appointment updated successfully') {
    return { error: 'Ocorreu um erro ao atualizar o agendamento' };
  }

  return Response.json({ data: response.message });
}
