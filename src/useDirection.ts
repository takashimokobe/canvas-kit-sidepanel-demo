import { useState } from 'react';

export function useDirection() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  return { direction, toggleDirection };
}
