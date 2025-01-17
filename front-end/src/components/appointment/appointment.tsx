import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

import { Card } from '@/components/card';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { Rating } from '@/components/rating/rating';

type Props = {
  id: string;
  patient: string;
  doctor: string;
  date: Date;
  status: string;
  rating?: number;
  showReviewButton?: boolean;
  onApprove?: (id: string) => void;
  onRefuse?: (id: string) => void;
  onFinish?: (id: string) => void;
};

export const Appointment: React.FC<Props> = ({
  id,
  date,
  doctor,
  patient,
  status,
  rating,
  onApprove,
  onRefuse,
  onFinish,
  showReviewButton,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('pt-br');
  const formattedHours = new Date(date).toLocaleTimeString('pt-br');

  const { push } = useRouter();

  const approveAppointment = () => {
    alert('Consulta confirmada!');
    onApprove?.(id);
  };

  const refuseAppointment = () => {
    alert('Consulta Recusada!');
    onRefuse?.(id);
  };

  const finishAppointment = () => {
    alert('Consulta finalizada!');
    onFinish?.(id);
  };

  const pushToReviewAppointment = () => {
    push('/review/' + id);
  };

  return (
    <Card className="mb-4">
      <div>
        {patient && (
          <p>
            <b>Paciente:</b> {patient}
          </p>
        )}
        {doctor && (
          <p>
            <b>Médico:</b> {doctor}
          </p>
        )}
        <p>
          <b>Data:</b> {formattedDate} - {formattedHours}
        </p>
        <p>
          <b>Status:</b> {status}
        </p>
        {rating && (
          <div className="flex gap-2 items-center">
            <b>Avaliação:</b> <Rating value={rating} />
          </div>
        )}
      </div>
      {onApprove && onRefuse && status === 'Aguardando Confirmação' && (
        <div className="flex gap-2">
          <button type="button" onClick={approveAppointment}>
            <HiCheckCircle className="rounded-full bg-green-700 h-6 w-6 text-white" />
          </button>
          <button type="button" onClick={refuseAppointment}>
            <HiXCircle className="rounded-full bg-red-700 h-6 w-6 text-white" />
          </button>
        </div>
      )}
      {onFinish && (
        <div className="flex gap-2">
          <button type="button" onClick={finishAppointment}>
            <HiCheckCircle className="rounded-full bg-green-700 h-6 w-6 text-white" />
          </button>
        </div>
      )}
      {showReviewButton && status === 'Concluida' && (
        <div className="flex gap-2">
          <Button type="button" onClick={pushToReviewAppointment}>
            Avaliar consulta
          </Button>
        </div>
      )}
    </Card>
  );
};
