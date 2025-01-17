import React from 'react';

import { Rating as FlowbiteRating } from 'flowbite-react';

type Props = {
  value: number;
};

export const Rating: React.FC<Props> = ({ value }) => {
  return (
    <FlowbiteRating>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FlowbiteRating.Star key={starValue} filled={value >= starValue} />
        );
      })}
    </FlowbiteRating>
  );
};
