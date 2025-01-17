import React from 'react';

import { Card as FlowbiteCard } from 'flowbite-react';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <FlowbiteCard horizontal={true} className={className}>
      {children}
    </FlowbiteCard>
  );
};
