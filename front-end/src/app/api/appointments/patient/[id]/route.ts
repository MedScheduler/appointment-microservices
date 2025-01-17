export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    'http://0.0.0.0:8000/api/v1/appointments/patient/' + id,
  ).then((res) => res.json());

  const appointmentsByDate = response.reduce((acc, value) => {
    const date = value.date.split('T')[0];

    if (!acc[date]) acc[date] = [];
    acc[date].push(value);

    return acc;
  }, {});

  return Response.json({ appointments: response, appointmentsByDate });
}

export async function POST(request: Request) {
  const { userId, doctorId, date, time } = await request.json();

  const body = {
    user_id: String(userId),
    doctor_id: doctorId,
    service_id: 'appointment',
    date: `${date}T${time}`,
    status: 'Aguardando Confirmação',
  };

  const response = await fetch('http://0.0.0.0:8000/api/v1/appointments/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  if (response.message !== 'Appointment created successfully') {
    return { error: 'Ocorreu um erro ao criar o agendamento' };
  }

  return Response.json({ data: response.message });
}
