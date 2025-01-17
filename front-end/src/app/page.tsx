'use client';

import React, { useEffect, useState } from 'react';

import { formatDate } from '@/utils/formatDate';
import { Avatar } from '@/components/avatar';
import { Appointment } from '@/components/appointment';
import { Calendar } from '@/components/calendar';
import { useUserInfo } from '@/contexts/user-context';

const AppointmentsUrl = (id: string) => ({
  patient: '/api/appointments/patient/' + id,
  doctor: '/api/appointments/doctor/' + id,
  admin: '/api/appointments/',
});

export default function Home() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [appointmentsByDate, setAppointmentsByDate] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  const { user } = useUserInfo();

  const fetchAppointments = async () => {
    const response = await fetch(
      AppointmentsUrl(user.id)[user.role.description],
    );
    const { appointmentsByDate, appointments } = await response.json();
    setAppointmentsByDate(appointmentsByDate);
    setAppointments(appointments);
  };

  const updateAppointment = (id: string) => async (status: string) => {
    await fetch('/api/appointments/' + id, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }).then((response) => response.json());
    fetchAppointments();
  };

  const onApproveAppointment = (id: string) => {
    updateAppointment(id)('Confirmada');
  };

  const onRefuseAppointment = (id: string) => {
    updateAppointment(id)('Recusada');
  };

  const onFinishAppointment = (id: string) => {
    updateAppointment(id)('Concluida');
  };

  useEffect(() => {
    if (user.id) {
      fetchAppointments();
    }
  }, [user.id]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Avatar name={user.name} />
        {user?.role?.description === 'patient' && (
          <a href="/appointments/create">Agendar consulta</a>
        )}
      </div>

      <h2 className="pt-4 pb-2 text-lg">Agenda</h2>
      <Calendar
        onClickAction={(date) => setDate(formatDate(date))}
        markedDates={Object.keys(appointmentsByDate)}
      />

      <h2 className="pt-4 pb-2 text-lg">Consultas do dia</h2>
      {appointmentsByDate[date]
        ?.filter(({ status }) => status === 'Confirmada')
        ?.map((appointment) => (
          <Appointment
            id={appointment._id}
            date={appointment.date}
            doctor={appointment.doctor?.name}
            patient={appointment.patient?.name}
            status={appointment.status}
            key={'my-appointments-' + appointment._id}
            {...(user?.role?.description !== 'patient'
              ? {
                  onFinish: onFinishAppointment,
                }
              : {})}
          />
        ))}

      <h2 className="pt-4 pb-2 text-lg">Consultas pendentes</h2>
      {appointmentsByDate[date]
        ?.filter(({ status }) => status === 'Aguardando Confirmação')
        ?.map((appointment) => (
          <Appointment
            id={appointment._id}
            date={appointment.date}
            doctor={appointment.doctor?.name}
            patient={appointment.patient?.name}
            status={appointment.status}
            key={'pending-appointments-' + appointment._id}
            {...(user?.role?.description !== 'patient'
              ? {
                  onApprove: onApproveAppointment,
                  onRefuse: onRefuseAppointment,
                }
              : {})}
          />
        ))}

      <h2 className="pt-4 pb-2 text-lg">Consultas Concluídas</h2>
      {appointmentsByDate[date]
        ?.filter(({ status }) => status === 'Concluida')
        ?.map((appointment) => (
          <Appointment
            id={appointment._id}
            date={appointment.date}
            doctor={appointment.doctor?.name}
            patient={appointment.patient?.name}
            status={appointment.status}
            rating={appointment?.review?.rating}
            key={'concluded-appointments-' + appointment._id}
          />
        ))}
    </div>
  );
}
