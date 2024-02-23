import { Button as MantineButton } from '@mantine/core';

export function Button(props: { children: string }) {
  return (
    <>
      <div>
        <MantineButton
          style={{
            width: 120,
          }}
          variant="default"
        >
          {props.children}
        </MantineButton>
      </div>
    </>
  );
}
