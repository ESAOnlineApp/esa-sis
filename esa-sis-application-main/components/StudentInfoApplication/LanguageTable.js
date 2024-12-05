/*
 * Created By: Mohamad Jaber,KANSO Adi
 * Project: SIS Application
 * File: components\StudentInfoApplication\LanguageTable.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import useTranslation from "next-translate/useTranslation";
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useState, useReducer } from 'react';

import { Form, useForm } from "../CommonComponents/from";
import { Input } from "../CommonComponents/input";
// import { FieldError } from '../CommonComponents/from';

export default function LanguageTable(validationSchema) {
  /* Importing the useTranslation hook from the react-i18next package. */
  const { t } = useTranslation();

  //  useForm Settings
  // const [validationSchema, setValidationSchema] = useState(yup.object({}));

  // const {
  //   handleSubmit,
  //   form.register,
  //   setValue,
  //   getValues,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });
  const form = useForm({
    schema: validationSchema,
  });
  return (
    <div>
      {/* Language Table */}
      <Form
        form={form}
        // onChange={(values) => // console.log(values)}
      >
        <table className="table-auto w-full border border-full text-center mt-5">
          <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th className=" px-6">{t("studentApp:language_title")}</th>
              <th className=" px-6">
                {t("studentApp:language_title_excellent")}
              </th>
              <th className=" px-6">{t("studentApp:language_title_good")}</th>
              <th className=" px-6">{t("studentApp:language_title_fair")}</th>
              <th className=" px-6">{t("studentApp:language_title_fluent")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
              // className={`${
              //   FieldError(languages_french_proficiency).errors
              //     ? 'text-red-500'
              //     : ''
              // }`}
              // className={`${
              //   errors.languages_french_proficiency
              //     ? 'text-red-500'
              //     : ''
              // }`}
              >
                {t("studentApp:languages_french")}
                <a className="text-red-500 mx-4 font-bold">*</a>
              </th>
              <td>
                <label htmlFor="excellet">
                  <Input
                    name="french"
                    id="french_excellent"
                    type="radio"
                    value="Excelent"
                    {...form.register("languages_french_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="good">
                  <Input
                    name="french"
                    id="french_good"
                    type="radio"
                    value="Good"
                    {...form.register("languages_french_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fair">
                  <Input
                    name="french"
                    id="french_fair"
                    type="radio"
                    value="Fair"
                    {...form.register("languages_french_proficiency")}
                  ></Input>
                </label>
              </td>

              <td>
                <label htmlFor="fluent">
                  <Input
                    name="french"
                    id="french_fluent"
                    type="radio"
                    value="Fluent"
                    {...form.register("languages_french_proficiency")}
                  ></Input>
                </label>
              </td>
            </tr>

            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
              // className={`${
              //   errors.languages_english_proficiency ? 'text-red-500' : ''
              // }`}
              >
                {t("studentApp:languages_english")}
                <a className="text-red-500 mx-4 ml-3 font-bold">*</a>
              </th>
              <td>
                <label htmlFor="excelent">
                  <Input
                    name="english"
                    id="english-excelent"
                    type="radio"
                    value="Excelent"
                    {...form.register("languages_english_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="good">
                  <Input
                    name="english"
                    id="english-good"
                    type="radio"
                    value="Good"
                    {...form.register("languages_english_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fair">
                  <Input
                    name="english"
                    id="english-fair"
                    type="radio"
                    value="Fair"
                    {...form.register("languages_english_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fluent">
                  <Input
                    name="english"
                    id="english-fluent"
                    type="radio"
                    value="Fluent"
                    {...form.register("languages_english_proficiency")}
                  ></Input>
                </label>
              </td>
            </tr>

            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
              <th
              // className={`${
              //   errors.languages_arabic_proficiency ? 'text-red-500' : ''
              // }`}
              >
                {t("studentApp:languages_arabic")}
                <a className="text-red-500 mx-4 font-bold">*</a>
              </th>
              <td>
                <label htmlFor="excelent">
                  <Input
                    name="arabic"
                    id="arabic-excelent"
                    type="radio"
                    value="Excelent"
                    {...form.register("languages_arabic_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="good">
                  <Input
                    name="arabic"
                    id="arabic-good"
                    type="radio"
                    value="Good"
                    {...form.register("languages_arabic_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fair">
                  <Input
                    name="arabic"
                    id="arabic-fair"
                    type="radio"
                    value="Fair"
                    {...form.register("languages_arabic_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fluent">
                  <Input
                    name="arabic"
                    id="arabic-fluent"
                    type="radio"
                    value="Fluent"
                    {...form.register("languages_arabic_proficiency")}
                  ></Input>
                </label>
              </td>
            </tr>

            <tr
            // className={`"border-b dark:bg-gray-800 dark:border-gray-700" ${
            //   errors.languages_other_language ? 'text-red-500' : ''
            // }`}
            >
              <th>
                {t("studentApp:languages_other")}
                <a className="text-red-500 mx-5 font-bold"></a>
              </th>
              <td>
                <label htmlFor="excelent">
                  <Input
                    name="other"
                    id="other-excelent"
                    type="radio"
                    value="Excelent"
                    {...form.register("languages_other_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="good">
                  <Input
                    name="other"
                    id="other-good"
                    type="radio"
                    value="Good"
                    {...form.register("languages_other_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fair">
                  <Input
                    name="other"
                    id="other-fair"
                    type="radio"
                    value="Fair"
                    {...form.register("languages_other_proficiency")}
                  ></Input>
                </label>
              </td>
              <td>
                <label htmlFor="fluent">
                  <Input
                    name="other"
                    id="other-fluent"
                    type="radio"
                    value="Fluent"
                    {...form.register("languages_other_proficiency")}
                  ></Input>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {(errors.languages_french_proficiency ||
        errors.languages_english_proficiency ||
        errors.languages_arabic_proficiency) && (
        <div className="text-red-500 text-md text-center p-2 font-bold">
          <span>{t('studentApp:languages_level')}</span>
        </div>
      )} */}

        <div className="flex items-center mb-2 mt-4">
          <label htmlFor="languages_other_language">
            {t("studentApp:languages_other_specific")}
          </label>
          <Input
            type="text"
            // className={`"w-96 h-9 mr-2 border-black" ${
            //   errors.languages_other_language ? 'border-red-500' : ''
            // }`}
            id="languages_other_language"
            {...form.register("languages_other_language")}
          />
        </div>
        {/* {errors.languages_other_language && (
        <div className="text-red-500 text-sm ml-64 p-2 font-bold">
          {errors.languages_other_language.message}
        </div>
      )} */}
      </Form>
    </div>
  );
}
