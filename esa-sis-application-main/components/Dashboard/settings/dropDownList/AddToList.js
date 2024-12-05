/*
 * Created By: Jaber Mohamad
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/AddtoList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';
// import { useForm } from 'react-hook-form';

const AddToList = ({
  value,
  inputValueEnHandler,
  inputValueFrHandler,
  inputValuePromotionHandler,
  itemsEn,
  itemsFr,
  itemsPromotion,
  register,
  errors,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 pt-5 gap-4 w-[70%] justify-self-center">
        <div className="font-bold">Add New Item:</div>
        <div className="flex flex-col gap-2">
          <div>
            <label className="w-48">
              EN
              <input
                className={`w-full ${errors.en && 'border border-red-500'}`}
                id="en"
                name="en"
                type="text"
                value={itemsEn}
                {...register('en', {
                  onChange: inputValueEnHandler,
                  required: 'Enter English Item',
                })}
              />
            </label>
          </div>
          {errors.en && (
            <div className="text-red-500 font-bold text-sm w-full md:ml-2 sm:ml-32 mb-4">
              {errors.en.message}
            </div>
          )}
          <div>
            <label className="w-48">
              FR
              <input
                className={`w-full ${errors.fr && 'border border-red-500'}`}
                type="text"
                value={itemsFr}
                {...register('fr', {
                  onChange: inputValueFrHandler,
                  required: 'Enter French Item',
                })}
              />
            </label>
          </div>
        </div>
        {errors.fr && (
          <div className="text-red-500 font-bold text-sm w-full md:ml-2 sm:ml-32 mb-4">
            {errors.fr.message}
          </div>
        )}
        {value === 'Academic Program' ? (
          <div>
            <label className="w-48">
              Promotion
              <input
                className={`w-full ${
                  errors.promotion && 'border border-red-500'
                }`}
                type="text"
                value={itemsPromotion}
                {...register('promotion', {
                  onChange: inputValuePromotionHandler,
                  required: 'Enter Promotion',
                })}
              />
            </label>
            {errors.promotion && (
              <div className="text-red-500 font-bold text-sm w-full md:ml-2 sm:ml-32 mb-4">
                {errors.promotion.message}
              </div>
            )}
          </div>
        ) : null}
        <div className="mt-2 flex md:justify-end">
          <button
            className="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 text-white w-32 p-2 font-bold rounded-lg"
            type="submit"
            disabled={!value ? true : false}
          >
            Add to List
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToList;
