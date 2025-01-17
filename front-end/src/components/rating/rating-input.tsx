import React, { useEffect, useState } from 'react';

import { Rating as FlowbiteRating } from 'flowbite-react';

type Props = {
  onChange?: (value: number) => void;
};

export const RatingInput: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <FlowbiteRating>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FlowbiteRating.Star
            key={starValue}
            onClick={() => setValue(starValue)}
            filled={value >= starValue}
          />
        );
      })}
    </FlowbiteRating>
  );
};
