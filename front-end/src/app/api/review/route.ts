export async function POST(request: Request) {
  const { userId, doctorId, appointmentId, rating, comment } =
    await request.json();

  const body = {
    user_id: userId,
    doctor_id: doctorId,
    appointment_id: appointmentId,
    rating,
    comment,
  };

  const response = await fetch('http://0.0.0.0:8003/api/v1/reviews/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  if (response.message !== 'Review created successfully') {
    return { error: 'Ocorreu um erro ao avaliar a consulta' };
  }

  return Response.json({ data: response.message });
}
