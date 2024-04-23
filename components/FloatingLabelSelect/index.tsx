'use client';

import { useState } from 'react';
import { ComboboxData, NativeSelect } from '@mantine/core';
const classes = require('./FloatingLabelSelect.module.css');

export function FloatingLabelSelect(props: {
  label: string;
  placeholder: string;
  data: ComboboxData;
  value: string;
  required?: boolean;
  setState: (value: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const floating = props.value.trim().length !== 0 || focused || undefined;

  return (
    <NativeSelect
      label={props.label}
      data={props.data}
      placeholder={props.placeholder}
      required={props.required}
      classNames={classes}
      value={props.value}
      onChange={(event) => {
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
