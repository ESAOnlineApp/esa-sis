/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\CommonComponents\input.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React, { forwardRef } from 'react';
import { FieldError } from '../CommonComponents/from';
export const Input = forwardRef(function Input(
  { label, type = 'text', ...props },
  ref
) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} ref={ref} {...props} />
      <FieldError name={props.name} />
    </div>
  );
});
