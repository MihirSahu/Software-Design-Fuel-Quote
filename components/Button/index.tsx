import { Button as MantineButton } from '@mantine/core';
import React from 'react';

type ButtonProps = {
  children: string;
  onClick?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  disabled?: boolean; // Optional disabled prop
};

export function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <div>
      <MantineButton
        style={{
          width: 120,
        }}
        variant="default"
        onClick={onClick}
        disabled={disabled} // Passing the disabled prop to the MantineButton
      >
        {children}
      </MantineButton>
    </div>
  );
}
