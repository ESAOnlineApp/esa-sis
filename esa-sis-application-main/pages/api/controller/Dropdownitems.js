/*
 * Created By:MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import nextConnect from "next-connect";
import { ReadDropdown, ReadDropdownSotred } from "./queries";
import { connect, disconnect } from "../../../utilities/db";
import encrypt from "../../../utilities/encrypt_decrypt/encryptText";
const handler = nextConnect();

handler.get(async (req, res) => {
  try{
  const major = req.query.major;
  const type = req.query.type;
  let response = {};
  let All = {};
  let [
    relationship_en,
    relationship_fr,
    baccalaureate_option_en,
    baccalaureate_option_fr,
    diseasetype_en,
    diseasetype_fr,
    source_en,
    source_fr,
  ] = [[], [], [], [], [], [], [], []];
  // Connect to the database only once
  const connection = await connect();

  // Taking comman data between all majors
  const healthproblem = await ReadDropdownSotred(
    connection,
    "healthproblem",
    "healthproblem_eng"
  );
  const relationship = await ReadDropdownSotred(
    connection,
    "relationship",
    "relationship_eng"
  );
  const baccalaureate_option = await ReadDropdownSotred(
    connection,
    "baccalaureate_option",
    "baccalaureate_eng"
  );
  const source = await ReadDropdownSotred(connection, "source", "source_eng");
  baccalaureate_option.forEach((item) => {
    baccalaureate_option_en.push(item.baccalaureate_eng);
  });
  baccalaureate_option.forEach((item) => {
    baccalaureate_option_fr.push(item.baccalaureate_fr);
  });
  healthproblem.forEach((item) => {
    diseasetype_en.push(item.healthproblem_eng);
  });
  healthproblem.forEach((item) => {
    diseasetype_fr.push(item.healthproblem_fr);
  });
  relationship.forEach((item) => {
    relationship_en.push(item.relationship_eng);
  });

  relationship.forEach((item) => {
    relationship_fr.push(item.relationship_fr);
  });
  source.forEach((item) => {
    source_en.push(item.source_eng);
  });
  source.forEach((item) => {
    source_fr.push(item.source_fr);
  });

  response = {
    diseasetype_en: diseasetype_en,
    diseasetype_fr: diseasetype_fr,
    relationship_en: relationship_en,
    relationship_fr: relationship_fr,
    baccalaureate_option_en: baccalaureate_option_en,
    baccalaureate_option_fr: baccalaureate_option_fr,
    source_en: source_en,
    source_fr: source_fr,
  };
  // Adding data needed for BBA if query was BBA
  if (major === "BBA") {
    let [school_en, school_fr, degreelevel_en, degreelevel_fr] = [
      [],
      [],
      [],
      [],
    ];
    const institution = await ReadDropdownSotred(
      connection,
      "institution",
      "instituation_eng"
    );
    const degree_level_bba = await ReadDropdownSotred(
      connection,
      "degree_level_bba",
      "degreelevel_eng"
    );
    institution.forEach((item) => {
      school_en.push(item.instituation_eng);
    });
    // // console.log('school_en==',school_en);
    institution.forEach((item) => {
      school_fr.push(item.instituation_fr);
    });
    degree_level_bba.forEach((item) => {
      degreelevel_en.push(item.degreelevel_eng);
    });
    degree_level_bba.forEach((item) => {
      degreelevel_fr.push(item.degreelevel_fr);
    });
    response = {
      ...response,
      school_en: school_en,
      school_fr: school_fr,
      degreelevel_en: degreelevel_en,
      degreelevel_fr: degreelevel_fr,
    };
  }
  // Major Other includes all data needed for all majors except BBA
  else if (major === "Other") {
    // // console.log("Entered Other")
    let [
      degreelevel_en,
      degreelevel_fr,
      fieldofstudy_en,
      fieldofstudy_fr,
      university_en,
      university_fr,
      company_en,
      company_fr,
      experience_type_en,
      experience_type_fr,
      payment_en,
      payment_fr,
    ] = [[], [], [], [], [], [], [], [], [], [], [], []];
    const degreelevel = await ReadDropdownSotred(
      connection,
      "degreelevel",
      "degreelevel_eng"
    );
    const discipline = await ReadDropdownSotred(
      connection,
      "discipline",
      "discipline_eng"
    );
    const university = await ReadDropdownSotred(
      connection,
      "university",
      "university_eng"
    );
    const company_name = await ReadDropdownSotred(
      connection,
      "company_name",
      "name_eng"
    );
    const experience_type = await ReadDropdownSotred(
      connection,
      "experience_type",
      "type_eng"
    );
    const payment = await ReadDropdownSotred(
      connection,
      "payment",
      "payment_eng"
    );

    degreelevel.forEach((item) => {
      degreelevel_en.push(item.degreelevel_eng);
    });
    degreelevel.forEach((item) => {
      degreelevel_fr.push(item.degreelevel_fr);
    });
    discipline.forEach((item) => {
      fieldofstudy_en.push(item.discipline_eng);
    });
    discipline.forEach((item) => {
      fieldofstudy_fr.push(item.discipline_fr);
    });
    university.forEach((item) => {
      university_en.push(item.university_eng);
    });
    university.forEach((item) => {
      university_fr.push(item.university_fr);
    });
    company_name.forEach((item) => {
      company_en.push(item.name_eng);
    });
    company_name.forEach((item) => {
      company_fr.push(item.name_fr);
    });
    experience_type.forEach((item) => {
      experience_type_en.push(item.type_eng);
    });
    experience_type.forEach((item) => {
      experience_type_fr.push(item.type_fr);
    });
    payment.forEach((item) => {
      payment_en.push(item.payment_eng);
    });
    payment.forEach((item) => {
      payment_fr.push(item.payment_fr);
    });

    response = {
      ...response,
      degreelevel_en: degreelevel_en,
      degreelevel_fr: degreelevel_fr,
      fieldofstudy_en: fieldofstudy_en,
      fieldofstudy_fr: fieldofstudy_fr,
      university_en: university_en,
      university_fr: university_fr,
      company_en: company_en,
      company_fr: company_fr,
      experience_type_en: experience_type_en,
      experience_type_fr: experience_type_fr,
      payment_en: payment_en,
      payment_fr: payment_fr,
    };
    // Taking the data needed for MBA/EMBA if type was equal to MBA
    if (type === "MBA") {
      // // console.log("and here")
      const functionalarea = await ReadDropdownSotred(
        connection,
        "functionalarea",
        "area_eng"
      );
      const experience_position = await ReadDropdownSotred(
        connection,
        "experience_position",
        "position_eng"
      );
      const business_activity = await ReadDropdownSotred(
        connection,
        "business_activity",
        "activity_eng"
      );
      let [
        functionalarea_en,
        functionalarea_fr,
        experience_position_en,
        experience_position_fr,
        business_activity_en,
        business_activity_fr,
      ] = [[], [], [], [], [], []];
      functionalarea.forEach((item) => {
        functionalarea_en.push(item.area_eng);
      });
      functionalarea.forEach((item) => {
        functionalarea_fr.push(item.area_fr);
      });
      experience_position.forEach((item) => {
        experience_position_en.push(item.position_eng);
      });
      experience_position.forEach((item) => {
        experience_position_fr.push(item.position_fr);
      });
      business_activity.forEach((item) => {
        business_activity_en.push(item.activity_eng);
      });
      business_activity.forEach((item) => {
        business_activity_fr.push(item.activity_fr);
      });

      response = {
        ...response,
        functionalarea_en: functionalarea_en,
        functionalarea_fr: functionalarea_fr,
        experience_position_en: experience_position_en,
        experience_position_fr: experience_position_fr,
        business_activity_en: business_activity_en,
        business_activity_fr: business_activity_fr,
      };
    }
  } else if (major === "All") {
    const healthproblem = await ReadDropdownSotred(
      connection,
      "healthproblem",
      "healthproblem_eng"
    );
    const relationship = await ReadDropdownSotred(
      connection,
      "relationship",
      "relationship_eng"
    );
    const baccalaureate_option = await ReadDropdownSotred(
      connection,
      "baccalaureate_option",
      "baccalaureate_eng"
    );
    const source = await ReadDropdownSotred(connection, "source", "source_eng");
    const institution = await ReadDropdownSotred(
      connection,
      "institution",
      "instituation_eng"
    );
    const degree_level_bba = await ReadDropdownSotred(
      connection,
      "degree_level_bba",
      "degreelevel_eng"
    );
    const degreelevel = await ReadDropdownSotred(
      connection,
      "degreelevel",
      "degreelevel_eng"
    );
    const discipline = await ReadDropdownSotred(
      connection,
      "discipline",
      "discipline_eng"
    );
    const university = await ReadDropdownSotred(
      connection,
      "university",
      "university_eng"
    );
    const company_name = await ReadDropdownSotred(
      connection,
      "company_name",
      "name_eng"
    );
    const experience_type = await ReadDropdownSotred(
      connection,
      "experience_type",
      "type_eng"
    );
    const payment = await ReadDropdownSotred(
      connection,
      "payment",
      "payment_eng"
    );
    const functionalarea = await ReadDropdownSotred(
      connection,
      "functionalarea",
      "area_eng"
    );
    const experience_position = await ReadDropdownSotred(
      connection,
      "experience_position",
      "position_eng"
    );
    const business_activity = await ReadDropdownSotred(
      connection,
      "business_activity",
      "activity_eng"
    );
    const majors = await ReadDropdown(connection, "major");
    All = {
      healthproblem: healthproblem,
      relationship: relationship,
      baccalaureate_option: baccalaureate_option,
      institution: institution,
      source: source,
      degree_level_bba: degree_level_bba,
      degreelevel: degreelevel,
      discipline: discipline,
      university: university,
      company_name: company_name,
      experience_type: experience_type,
      payment: payment,
      functionalarea: functionalarea,
      experience_position: experience_position,
      business_activity: business_activity,
      majors: majors,
    };
  }

  // If data is empty then the operation will fail
  if (!response) {
    res.status(500).json({ message: "failed" });
  } else {
    if (major === "All") {
      const encryptedBody = encrypt(JSON.stringify(All));
      res.status(200).json({ message: "success", data: encryptedBody });
    } else {
      const encryptedBody = encrypt(JSON.stringify(response));
      res.status(200).json({ message: "success", data: encryptedBody });
    }
  }
  // Disconnect from the database only once
  await disconnect(connection);
}catch(error){
  console.log('the error is in Dropdownitems.js in controller in api : ', error)
  return;
}
});


export default handler;
