'use client';

import { useState } from 'react';
import { TextInput } from '@mantine/core';
const classes = require('./FloatingLabelInput.module.css');

export function FloatingLabelInput(props: {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  maxLength?: number;
  minLength?: number;
  max?: number;
  disabled?: boolean;
  initialValue?: string;
  number?: boolean;
  setState?: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.initialValue ?? '');
  const floating = value.trim().length !== 0 || focused || undefined;

  return (
    <TextInput
      label={props.label}
      placeholder={props.placeholder}
      required={props.required}
      classNames={classes}
      value={value}
      onChange={(event) => {
        const newText = event.currentTarget.value;
        if (props.setState) {
          props.setState(event.currentTarget.value);
        }

        if (props.number) {
          const numberText = newText
            .split('')
            .filter((c) => '1234567890-'.indexOf(c) >= 0)
            .join('');
          if (props.maxLength !== undefined && numberText.length > props.maxLength) {
            setValue(numberText.substring(0, props.maxLength));
            return;
          }
          setValue(numberText);
          return;
        }

        setValue(newText);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
      type={props.type}
      maxLength={props.maxLength}
      minLength={props.minLength}
      max={props.max}
      disabled={props.disabled}
    />
  );
}
