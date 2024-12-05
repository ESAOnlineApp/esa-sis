/*
 * Created By: Jaber Mohamad/MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import selection_data from "../../../../utilities/selection_data";
import AddToList from "./AddToList";
import ListTable from "./ListTable";
import axios from "axios";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";

export const DropDownList = () => {
  const dropDownList = selection_data.adminDropDownList;
  const [value, setValue] = useState("");
  const [itemsEn, setItemsEn] = useState("");
  const [itemsFr, setItemsFr] = useState("");
  const [itemsPromotion, setItemsPromotion] = useState("");
  const [refresh, setRefresh] = useState(false);

  const {
    handleSubmit,
    register,
    // getValues,
    // setValue,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const selectChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const inputValueEnHandler = (e) => {
    setItemsEn(e.target.value);
  };
  const inputValueFrHandler = (e) => {
    setItemsFr(e.target.value);
  };

  const inputValuePromotionHandler = (e) => {
    setItemsPromotion(e.target.value);
    // console.log(e.target.value);
  };

  const submitHandler = async (tablename, eng, fr) => {
    if (value === "Academic Program") {
      tablename = "major";
      eng = "program";
      fr = "programfr";
    } else if (value === "Payment") {
      tablename = "payment";
      eng = "payment_eng";
      fr = "payment_fr";
    } else if (value === "Business Activity") {
      tablename = "business_activity";
      eng = "activity_eng";
      fr = "activity_fr";
    } else if (value === "Functional Area") {
      tablename = "functionalarea";
      eng = "area_eng";
      fr = "area_fr";
    } else if (value === "Position") {
      tablename = "experience_position";
      eng = "position_eng";
      fr = "position_fr";
    } else if (value === "Experience Type") {
      tablename = "experience_type";
      eng = "type_eng";
      fr = "type_fr";
    } else if (value === "Company") {
      tablename = "company_name";
      eng = "name_eng";
      fr = "name_fr";
    } else if (value === "Source") {
      tablename = "source";
      eng = "source_eng";
      fr = "source_fr";
    } else if (value === "Education Baccalaureate Option") {
      tablename = "baccalaureate_option";
      eng = "baccalaureate_eng";
      fr = "baccalaureate_fr";
    } else if (value === "Relationship") {
      tablename = "relationship";
      eng = "relationship_eng";
      fr = "relationship_fr";
    } else if (value === "Education Degree Level") {
      tablename = "degreelevel";
      eng = "degreelevel_eng";
      fr = "degreelevel_fr";
    } else if (value === "Emergency Contact Disease Type") {
      tablename = "healthproblem";
      eng = "healthproblem_eng";
      fr = "healthproblem_fr";
    } else if (value === "Field of Study") {
      tablename = "discipline";
      eng = "discipline_eng";
      fr = "discipline_fr";
    } else if (value === "Education Universities") {
      tablename = "university";
      eng = "university_eng";
      fr = "university_fr";
    } else if (value === "Education Degree Level BBA") {
      tablename = "degree_level_bba";
      eng = "degreelevel_eng";
      fr = "degreelevel_fr";
    } else if (value === "Education Institution") {
      tablename = "institution";
      eng = "instituation_eng";
      fr = "instituation_fr";
    }
    const payload = {
      itemsEn: itemsEn,
      itemsFr: itemsFr,
      itemsPromotion: itemsPromotion,
      eng: eng,
      fr: fr,
      tablename: tablename,
    };
    const encryptedBody = encrypt(JSON.stringify(payload));
    //// console.log(encryptedBody)
    try {
      const result = await axios.post(`/api/admin/setting/add`, {
        data: encryptedBody,
      });

      setRefresh(!refresh);
      return result.data;
    } catch (error) {
      console.error(error);
      return {
        message: "Failed to Insert table",
      };
    }
  };

  return (
    <>
      <form
        className="mx-auto w-full p-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-4 pb-5 w-[70%]">
          <div className="flex justify-center">
            <label className="w-48 mt-2 font-bold">Drop Down List</label>
            <select
              className="md:w-full mr-2"
              value={value}
              onChange={selectChangeHandler}
            >
              {dropDownList.map((list, index) => (
                <option key={index}>{list}</option>
              ))}
            </select>
          </div>
        </div>
        <ListTable key={refresh} value={value} />
        <AddToList
          value={value}
          inputValueEnHandler={inputValueEnHandler}
          inputValueFrHandler={inputValueFrHandler}
          inputValuePromotionHandler={inputValuePromotionHandler}
          itemsEn={itemsEn}
          itemsFr={itemsFr}
          itemsPromotion={itemsPromotion}
          register={register}
          errors={errors}
        />
      </form>
    </>
  );
};
