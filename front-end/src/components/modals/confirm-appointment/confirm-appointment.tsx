'use client';

import { Button, Modal, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { FeedbackModal } from '@/components/modals/success-modal/success-modal';

type Props = {
  open?: boolean;
  onClose?: () => void;
  appointment: {
    id: string;
    specialty: string;
  };
};

export const ConfirmAppointmentModal: React.FC<Props> = ({ open, onClose }) => {
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
          onClose?.();
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
              Selecione o médico para essa consulta:
            </h3>
            <Select id="specialties" required>
              <option>Dr João</option>
              <option>Dr Luiz</option>
              <option>Dr Renato</option>
            </Select>

            <Button
              className="mt-5 mx-auto"
              color="success"
              onClick={() => setOpenModal(false)}
            >
              OK
            </Button>
          </div>
          <FeedbackModal label={'Adicionado com sucesso'} status={'success'} />
        </Modal.Body>
      </Modal>
    </>
  );
};
