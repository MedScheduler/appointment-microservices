'use client';

import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

export type FeedbackModalProps = {
  label?: string;
  status?: 'success' | 'failure';
  open?: boolean;
  onClose?: () => void;
};

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  label,
  status,
  open,
  onClose,
}) => {
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const icon = {
    success: (
      <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-700" />
    ),
    failure: <HiXCircle className="mx-auto mb-4 h-14 w-14 text-red-700" />,
  };

  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {icon[status || 'success']}
          <h3 className="mb-5 text-lg font-normal">{label}</h3>
          <Button
            className="mx-auto"
            color="success"
            onClick={() => {
              setOpenModal(false);
              onClose?.();
            }}
          >
            OK
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
