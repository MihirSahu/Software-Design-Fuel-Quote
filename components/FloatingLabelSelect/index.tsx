'use client';

import { useState } from 'react';
import { ComboboxData, NativeSelect } from '@mantine/core';
const classes = require('./FloatingLabelSelect.module.css');

export function FloatingLabelSelect(props: {
  label: string;
  placeholder: string;
  data: ComboboxData;
  required?: boolean;
  initialValue?: string;
  setState: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.initialValue ?? '');
  const floating = value.trim().length !== 0 || focused || undefined;

  return (
    <NativeSelect
      label={props.label}
      data={props.data}
      placeholder={props.placeholder}
      required={props.required}
      classNames={classes}
      value={value}
      onChange={(event) => {
        const newValue = event.currentTarget.value;
        setValue(newValue); // Update local state to ensure UI is updated
        props.setState(event.currentTarget.value);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      data-floating={floating}
      labelProps={{ 'data-floating': floating }}
    />
    // <TextInput
    //   label={props.label}
    //   placeholder={props.placeholder}
    //   required={props.required}
    // //   classNames={classes}
    //   value={value}
    //   onChange={(event) => setValue(event.currentTarget.value)}
    //   onFocus={() => setFocused(true)}
    //   onBlur={() => setFocused(false)}
    //   mt="md"
    //   autoComplete="nope"
    //   data-floating={floating}
    //   labelProps={{ 'data-floating': floating }}
    //   type={props.type}
    //   maxLength={props.maxLength}
    // />
  );
}
