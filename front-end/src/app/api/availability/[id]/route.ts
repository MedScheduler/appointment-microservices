export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(
    'http://0.0.0.0:8004/api/v1/availability/doctor/' + id,
  ).then((res) => res.json());

  const result = {};

  for (const { available_times } of response) {
    for (const time of available_times) {
      const [date, hour] = time.split('T');
      const formattedTime = hour.split('.')[0];

      if (!result[date]) {
        result[date] = [];
      }

      result[date].push(formattedTime);
    }
  }

  return Response.json(result);
}
