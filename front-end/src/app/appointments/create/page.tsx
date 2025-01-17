'use client';

import { AppointmentForm } from '@/components/forms/appointment-form/appointment-form';
import React, { useEffect } from 'react';
import { useUserInfo } from '@/contexts/user-context';
import {
  FeedbackModal,
  FeedbackModalProps,
} from '@/components/modals/success-modal/success-modal';
import { useRouter } from 'next/navigation';

export default function CreateAppointmentPage() {
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [availability, setAvailability] = React.useState<{}>({});
  const [selectedDoctor, setSelectedDoctor] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [modal, setModal] = React.useState<FeedbackModalProps>({});

  const { user } = useUserInfo();
  const { push } = useRouter();

  const getDoctors = async () => {
    const response = await fetch('/api/doctors').then((response) =>
      response.json(),
    );
    setDoctors(response);
  };

  const getAvailabilities = async () => {
    const response = await fetch('/api/availability/' + selectedDoctor).then(
      (response) => response.json(),
    );
    setAvailability(response);
  };

  const updateDoctor = async ({ doctorId, date }) => {
    setSelectedDoctor(doctorId);
    setSelectedDate(date);
  };

  const onSubmit = async (data) => {
    const createAppointment = await fetch('/api/appointments/', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId: user.id }),
    }).then((response) => response.json());

    if (createAppointment.error) {
      return setModal({
        label: 'Ocorreu um erro ao criar o agendamento',
        status: 'failure',
      });
    }

    setModal({
      label: 'Agendamento criado com sucesso',
      status: 'success',
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      getAvailabilities();
    }
  }, [selectedDoctor]);

  return (
    <>
      <AppointmentForm
        dates={Object.keys(availability)}
        times={availability[selectedDate]}
        doctors={doctors}
        onChange={updateDoctor}
        onSubmit={onSubmit}
      />
      <FeedbackModal
        label={modal.label}
        status={modal.status}
        open={!!modal.label && !!modal.status}
        onClose={modal.status === 'success' ? () => push('/') : undefined}
      />
    </>
  );
}
