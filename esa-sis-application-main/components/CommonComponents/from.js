/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\CommonComponents\From.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

// We will fully type `<Form />` component by providing component props and fwding // those

import {
  // we import useForm hook as useHookForm
  useForm as useHookForm,
  // context provider for our form
  FormProvider,
  // hook that would return errors in current instance of form
  useFormContext,
} from 'react-hook-form';

// Type of zod schema

export const useForm = ({ schema, ...formConfig }) => {
  return useHookForm({
    ...formConfig,
    resolver: yupResolver(schema),
  });
};

// we omit the native `onSubmit` event in favor of `SubmitHandler` event
// the beauty of this is, the values returned by the submit handler are fully typed

export const Form = ({ form, onSubmit, children, ...props }) => {
  return (
    <FormProvider {...form}>
      {/* the `form` passed here is return value of useForm() hook */}
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  );
};

export function FieldError({ name }) {
  // the useFormContext hook returns the current state of hook form.
  const {
    formState: { errors },
  } = useFormContext();
  if (!name) return null;
  const error = errors[name];
  if (!error) return null;
  return error.message;
  // return <span>{error.message}</span>;
}
