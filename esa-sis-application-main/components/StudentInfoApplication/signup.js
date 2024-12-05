/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: components\StudentInfoApplication\signup.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from "react";
import { yup } from "yup";

// make sure to import it properly !
import { Form, useForm } from "./components/form";
import { Input } from "./components/input";

// lets declare our validation and shape of form
// zod takes care of email validation, it also supports custom regex! (only if I could understand this language of gods 😂)

const signUpFormSchema = yup.object({
  firstName: yup
    .string()
    .min(1, "First Name must be atleast 1 characters long!"),
  username: yup
    .string()
    .min(1, "Username must be atleast 1 characters long!")
    .max(10, "Consider using shorter username."),
  email: yup.string().email("Please enter a valid email address."),
  password: yup
    .string()
    .min(6, "Please choose a longer password")
    .max(256, "Consider using a short password"),
  // add your fancy password requirements 👿
});

let renderCount = 0;
export function SignUpForm() {
  // this is hook is required to use form
  const form = useForm({
    schema: signUpFormSchema,
  });
  renderCount++;
  return (
    <div>
      <h1>Signup form using RHF + YUP [Uncontrolled]</h1>
      <h2>Render Count = {renderCount}</h2>
      <p>
        Try making mistakes in the form. You can check console to see submitted
        values.
      </p>

      {/* provide the form and onSubmit handler to form component */}
      <Form
        form={form}
        //  onSubmit={(values) => // console.log(values)}
      >
        <Input
          label="Your first name"
          type="text"
          placeholder="John"
          // press ctrl + space when you type firstName
          {...form.register("firstName")}
        />
        <Input
          label="Choose username"
          type="text"
          placeholder="im_john_doe"
          {...form.register("username")}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...form.register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Your password (min 5)"
          {...form.register("password")}
        />
        <button type="submit">Submit </button>
      </Form>
    </div>
  );
}
