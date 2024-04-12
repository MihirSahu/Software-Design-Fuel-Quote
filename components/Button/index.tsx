import { Button as MantineButton } from '@mantine/core';

export function Button(props: {
  children: string;
  onClick?: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <>
      <div>
        <MantineButton
          style={{
            width: 120,
          }}
          variant="default"
          onClick={props.onClick}
        >
          {props.children}
        </MantineButton>
      </div>
    </>
  );
}
