'use client';

import React from 'react';
import { Calendar as CalendarLib } from 'react-calendar';
import { formatDate } from '@/utils/formatDate';

type Props = {
  markedDates: string[];
  onClickAction: (date: Date) => void;
};

export const Calendar: React.FC<Props> = ({ markedDates, onClickAction }) => {
  return (
    <CalendarLib
      className="!w-full"
      onClickDay={onClickAction}
      tileClassName={({ date }) =>
        markedDates.includes(formatDate(date)) ? '!bg-green-200' : ''
      }
      calendarType="gregory"
      locale="pt-br"
    />
  );
};
