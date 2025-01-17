'use client';

import { ReviewForm } from '@/components/forms/review-form/review-form';
import React from 'react';
import {
  FeedbackModal,
  FeedbackModalProps,
} from '@/components/modals/success-modal/success-modal';
import { useRouter } from 'next/navigation';

export default function ReviewPage() {
  const [modal, setModal] = React.useState<FeedbackModalProps>({});
  const { push } = useRouter();

  const onSubmit = async (data) => {
    const createAppointment = await fetch('/api/review/', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((response) => response.json());

    if (createAppointment.error) {
      return setModal({
        label: 'Ocorreu um erro ao avaliar a consulta',
        status: 'failure',
      });
    }

    setModal({
      label: 'Avaliação enviada com sucesso',
      status: 'success',
    });
  };

  return (
    <>
      <ReviewForm onSubmit={onSubmit} />
      <FeedbackModal
        label={modal.label}
        status={modal.status}
        open={!!modal.label && !!modal.status}
        onClose={modal.status === 'success' ? () => push('/') : undefined}
      />
    </>
  );
}
