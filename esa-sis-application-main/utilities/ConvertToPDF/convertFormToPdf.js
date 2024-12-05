/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: utilities\convertFormToPdf.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import selection_data from "../selection_data";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// import { join } from 'path';
import * as dateFn from "date-fns";
import moment from "moment";
// import { useSelector } from 'react-redux';

async function convertFormToPdf(payLoad, t, session) {
  // const appState = useSelector(
  // (state) => state.persistedReducer.app_state.appState
  // );
  //format date
  const dob = payLoad.personalinfo_dob;
  const formatedDate = moment(dob).format("DD/MM/YYYY");
  //start date
  const startdate = payLoad.experience_startDate;
  const formatedStartDate = moment(startdate).format("DD/MM/YYYY");
  //jsPdf start

  const doc = new jsPDF("portrait", "pt", "a4");

  //drawing line on each title
  function drawTextAndLine(doc, text, y) {
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(text, 35, y);
    doc.setDrawColor(0, 0, 200);
    doc.setLineWidth(1);
    doc.line(35, y + 2, 35 + textWidth, y + 2);
  }

  //Start Header

  doc.setFontSize(18);
  //logo

  let old_height = 284;
  let old_width = 177;
  let aspect_ratio = old_width / old_height;
  let new_width = 100;
  let new_height = aspect_ratio * new_width;

  doc.addImage(
    selection_data.esa_logo,
    "PNG",
    0,
    0,
    new_height,
    new_width,
    undefined,
    "FAST"
  );

  //personal photo
  doc.setLineWidth(2);
  doc.setDrawColor(64, 64, 64);
  //Frame
  doc.rect(480 - 1, 10 - 1, 80 + 2, 80 + 2);

  doc.addImage(payLoad.profileUrl, "PNG", 480, 10, 80, 80, undefined, "FAST");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");
  doc.text("ESA Business School", 60, 20, { align: "left" });
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 200);
  doc.text("Application ID", 60, 40, { align: "left" });
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(":" + session.user.ID, 130, 40, {
    align: "left",
  });
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");

  const fnameArray = payLoad.fname.split("");
  const lnameArray = payLoad.lname.split("").map((char) => char.toUpperCase());
  const fullNameArray = fnameArray.concat([" "], lnameArray);
  const fullName = fullNameArray.join("");
  doc.text(fullName, 300, 60, { align: "center" });

  // if (payLoad.fname.length <= payLoad.lname.length) {
  //   doc.text(payLoad.fname, 265, 60, { align: "center" });
  //   doc.text(payLoad.lname.toUpperCase(), 320, 60, { align: "center" });
  // } else {
  //   doc.text(payLoad.fname, 280, 60, { align: "center" });
  //   doc.text(payLoad.lname.toUpperCase(), 370, 60, { align: "center" });
  // }
  doc.setFontSize(10);
  doc.text(session.user.major, 310, 80, { align: "center" });
  const promotionArray = session.user.promotion.split("");
  const majorPromotionArray = promotionArray.concat(
    [" - "],
    new Date().getFullYear()
  );
  const majorPromotion = majorPromotionArray.join("");
  doc.text(majorPromotion, 310, 100, { align: "center" });

  //end Header
  // Personal Information table
  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");

  doc.setFontSize(8);
  drawTextAndLine(doc, t("studentApp:personal_information"), 130);

  //start of table
  autoTable(doc, {
    theme: "grid",
    startY: 140,
    styles: {
      overflow: "linebreak",
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: {
        textColor: [0, 0, 200],
        fontStyle: "bold",
        cellWidth: 150,
      },
      1: {
        fontStyle: "bold",
        cellWidth: "auto",
      },
    },
    body: [
      //Personal Information
      [`${t("studentApp:personalinfo_title")} `, payLoad.personalinfo_title],
      [`${t("studentApp:lname")} `, payLoad.lname],
      [`${t("studentApp:fname")} `, payLoad.fname],
      [
        `${t("studentApp:personalinfo_maidenname")} `,
        (payLoad.personalinfo_maidenname &&
          payLoad.personalinfo_maidenname.trim()) ||
          "---",
      ],
      [
        `${t("studentApp:personalinfo_fathername")} `,
        payLoad.personalinfo_fathername,
      ],
      [
        `${t("studentApp:personalinfo_mothernname")} `,
        payLoad.personalinfo_mothernname,
      ],
      [`${t("studentApp:personalinfo_gender")} `, payLoad.personalinfo_gender],
      [`${t("studentApp:personalinfo_dob")} `, formatedDate],
      [
        `${t("studentApp:personalinfo_countryofbirth")} `,
        payLoad.personalinfo_countryofbirth,
      ],
      [
        `${t("studentApp:personalinfo_nationality_firstnationality")} `,
        payLoad.personalinfo_nationality_firstnationality,
      ],
      [
        `${t("studentApp:personalinfo_nationality_secondnationality")}`,
        (payLoad.personalinfo_nationality_secondnationality &&
          payLoad.personalinfo_nationality_secondnationality.trim()) ||
          "---",
      ],
      [
        `${t("studentApp:personalinfo_maritalstatus")} `,
        payLoad.personalinfo_maritalstatus,
      ],
      //number of children
      [
        `${t("studentApp:personalinfo_placeofbirth")} `,
        payLoad.personalinfo_placeofbirth,
      ],
      [
        `${t("studentApp:personalinfo_registrationnumber")} `,
        payLoad.personalinfo_registrationnumber,
      ],
    ],
    margin: { top: 145 },
  });
  //end table

  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");
  drawTextAndLine(doc, t("studentApp:address"), 360);

  //start of address table
  autoTable(doc, {
    theme: "grid",
    startY: 370,
    styles: {
      overflow: "linebreak",
      fontSize: 8,
      cellPadding: 2,
      halign: "left",
    },
    columnStyles: {
      0: {
        textColor: [0, 0, 200],
        fontStyle: "bold",
        cellWidth: 150,
      },
      1: {
        fontStyle: "bold",
        cellWidth: "auto",
      },
    },
    body: [
      //Address
      [`${t("studentApp:address_city")} `, payLoad.address_city],
      [`${t("studentApp:address_country")} `, payLoad.address_country],
      [
        `${t("studentApp:address_region")} `,
        (payLoad.address_region && payLoad.address_region.trim()) || "---",
      ],
      [`${t("studentApp:address_building")} `, payLoad.address_building],
      [`${t("studentApp:address_street")} `, payLoad.address_street],
      [`${t("studentApp:address_floor")} `, payLoad.address_floor],
      [
        `${t("studentApp:address_postal")} `,
        (payLoad.address_postal && payLoad.address_postal.trim()) || "---",
      ],
    ],
  });

  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");

  doc.setFontSize(8);
  drawTextAndLine(doc, t("studentApp:contact_pdf_title"), 490);

  //end table

  //start of contact info table
  autoTable(doc, {
    theme: "grid",
    startY: 500,
    styles: {
      overflow: "linebreak",
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: {
        textColor: [0, 0, 200],
        fontStyle: "bold",
        cellWidth: 150,
      },
      1: {
        fontStyle: "bold",
        cellWidth: "auto",
      },
    },
    body: [
      //Contact Info
      [
        `${t("studentApp:contactinfo_phonenumber_mobileNumber")} `,
        payLoad.contactinfo_phonenumber_mobileNumber,
      ],
      [
        `${t("studentApp:contactinfo_phonenumber_landlineNumber")} `,
        (payLoad.contactinfo_phonenumber_landlineNumber &&
          payLoad.contactinfo_phonenumber_landlineNumber.trim()) ||
          "---",
      ],
      [`${t("studentApp:contactinfo_email_firstemail")} `, payLoad.email],
      [
        `${t("studentApp:contactinfo_email_secondemail")} `,
        (payLoad.contactinfo_email_secondemail &&
          payLoad.contactinfo_email_secondemail.trim()) ||
          "---",
      ],
    ],
  });

  //end of personal information table

  //contact urgent table

  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");
  doc.setFontSize(8);
  drawTextAndLine(doc, t("studentApp:emergency_contact"), 590);

  //start of first table

  autoTable(doc, {
    theme: "grid",
    startY: 600,
    styles: {
      overflow: "linebreak",
      fontSize: 8,
      cellPadding: 2,
    },
    columnStyles: {
      0: {
        textColor: [0, 0, 200],
        fontStyle: "bold",
        cellWidth: 150,
      },
      1: {
        fontStyle: "bold",
        cellWidth: "auto",
      },
    },
    body: [
      //Contact Info
      [
        `${t("studentApp:emergencycontact_prefix")} `,
        payLoad.emergencycontact_prefix,
      ],
      [
        `${t("studentApp:emergencycontact_firstname")} `,
        payLoad.emergencycontact_firstname,
      ],
      [
        `${t("studentApp:emergencycontact_middlename")} `,
        payLoad.emergencycontact_middlename,
      ],
      [
        `${t("studentApp:emergencycontact_lastname")} `,
        payLoad.emergencycontact_lastname,
      ],
      [
        `${t("studentApp:emergencycontact_relationship")} `,
        payLoad.emergencycontact_relationship,
      ],
      [
        `${t("studentApp:emergencycontact_phonenumber")} `,
        payLoad.emergencycontact_phonenumber,
      ],
      [
        `${t("studentApp:emergencycontact_medicalhealth_pdf")} `,
        payLoad.emergencycontact_medicalhealth === "No"
          ? payLoad.emergencycontact_medicalhealth
          : payLoad.emergencycontact_diseasetype
          ? payLoad.emergencycontact_diseasetype
          : "---",
      ],
    ],
  });

  //end table
  doc.addPage();
  //Academic Information table
  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");

  doc.setFontSize(8);
  drawTextAndLine(doc, t("studentApp:academic_languages_pdf_title"), 35);

  let education_table_head;
  let education_table_body;
  if (session.user.major === "BBA (Bachelor in Business Administration)") {
    (education_table_head = [
      [
        `${t("studentApp:academic_languages_pdf_degree_level")} `,
        `${t(
          "studentApp:academic_languages_pdf_education_baccalaureateoption"
        )} `,
        `${t("studentApp:academic_languages_pdf_year_of_acquisition")} `,
        `${t("studentApp:academic_languages_pdf_institution")} `,
        `${t("studentApp:academic_languages_pdf_country")} `,
      ],
    ]),
      (education_table_body = [
        [
          payLoad.education_degreelevel,
          payLoad.education_baccalaureateoption,
          payLoad.education_yearofacquisition,
          payLoad.education_institution === "Other" ||
          payLoad.education_institution === "Autre"
            ? payLoad.education_institution_other
            : payLoad.education_institution,
          payLoad.education_country,
        ],
      ]);
  } else {
    (education_table_head = [
      [
        `${t("studentApp:academic_languages_pdf_degree_level")} `,
        `${t("studentApp:academic_languages_pdf_field_of_study")} `,
        // `${t('studentApp:academic_languages_pdf_education_baccalaureateoption')} `,
        `${t("studentApp:academic_languages_pdf_year_of_acquisition")} `,
        `${t("studentApp:academic_languages_pdf_institution")} `,
        `${t("studentApp:academic_languages_pdf_country")} `,
        `${t("studentApp:academic_education_degreeTitle")}`,
      ],
    ]),
      (education_table_body = [
        [
          payLoad.education_degreelevel,
          payLoad.education_fieldOfStudy === "Other" ||
          payLoad.education_fieldOfStudy === "Autre"
            ? payLoad.education_OtherFieldOfStudy
            : payLoad.education_fieldOfStudy,
          // payLoad.education_baccalaureateoption,
          payLoad.education_yearofacquisition,
          payLoad.education_institution === "Other" ||
          payLoad.education_institution === "Autre"
            ? payLoad.education_institution_other
            : payLoad.education_institution,
          payLoad.education_country,
          payLoad.education_degreeTitle,
        ],
      ]);
  }

  autoTable(doc, {
    theme: "grid",
    startY: 45,
    styles: {
      overflow: "linebreak",
      fontSize: 8,
      halign: "center",
    },
    headStyles: {
      fillColor: [255, 255, 255],

      textColor: [0, 0, 200],
      fontStyle: "bold",

      lineWidth: 0.1,
      lineColor: [128, 128, 128],
      border: [true, true, true, true],
    },

    head: education_table_head,
    bodyStyles: {
      cellWidth: "auto",
    },

    body: education_table_body,
  });
  //end of the table
  doc.setTextColor(0, 0, 200);
  doc.setFont(undefined, "bold");
  doc.setFontSize(8);

  //BBA DATA
  if (session.user.major === "BBA (Bachelor in Business Administration)") {
    var headers = [
      "",
      `${t("studentApp:education_math")}`,
      `${t("studentApp:education_his")}`,
      `${t("studentApp:education_geo")}`,
      `${t("studentApp:education_econ")}`,
      `${t("studentApp:education_mean")}`,
      `${t("studentApp:education_range")}`,
    ];
    var rows = [
      [
        "Second",
        payLoad.education_schoolgrades_second_math,
        payLoad.education_schoolgrades_second_hist,
        payLoad.education_schoolgrades_second_geo,
        payLoad.education_schoolgrades_second_economie,
        payLoad.education_schoolgrades_second_mean,
        payLoad.education_schoolgrades_second_range,
      ],
      [
        "Premiere",
        payLoad.education_schoolgrades_premiere_math,
        payLoad.education_schoolgrades_premiere_hist,
        payLoad.education_schoolgrades_premiere_geo,
        payLoad.education_schoolgrades_premiere_economie,
        payLoad.education_schoolgrades_premiere_mean,
        payLoad.education_schoolgrades_premiere_range,
      ],
      [
        "Terminale",
        payLoad.education_schoolgrades_terminale_math,
        payLoad.education_schoolgrades_terminale_hist,
        payLoad.education_schoolgrades_terminale_geo,
        payLoad.education_schoolgrades_terminale_economie,
        payLoad.education_schoolgrades_terminale_mean,
        payLoad.education_schoolgrades_terminale_range,
      ],
    ];

    drawTextAndLine(doc, t("studentApp:school_grades"), 100);
    autoTable(doc, {
      theme: "grid",
      startY: 110,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        halign: "center",
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 200],
        fontStyle: "bold",
        lineWidth: 0.1,
        lineColor: [128, 128, 128],
      },
      head: [headers],
      body: rows,
    });

    autoTable(doc, {
      theme: "grid",
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 130,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },
      body: [
        [
          "SAT - Score: ",
          payLoad.education_sat != null ? payLoad.education_sat : "---",
        ],
      ],
    });
    //languages
    drawTextAndLine(doc, t("studentApp:language_pdf_title"), 260);
    const language_body_bba = [
      [
        `${t("studentApp:languages_french")} `,
        payLoad.languages_french_proficiency,
      ],
      [
        `${t("studentApp:languages_english")} `,
        payLoad.languages_english_proficiency,
      ],
      [
        `${t("studentApp:languages_arabic")} `,
        payLoad.languages_arabic_proficiency,
      ],
    ];
    if (
      payLoad.languages_other_language &&
      payLoad.languages_other_proficiency
    ) {
      language_body_bba.push([
        payLoad.languages_other_language,
        payLoad.languages_other_proficiency,
      ]);
    }
    autoTable(doc, {
      theme: "grid",
      startY: 270,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 130,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },
      body: language_body_bba,
    });
    //motivation
    drawTextAndLine(doc, t("studentApp:motivationletter"), 350);

    autoTable(doc, {
      theme: "striped",
      startY: 360,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.motivationletter]],
    });

    //     let sourcesArray=[];
    // for (let i = 0; i < payLoad.source.length; i++) {
    //   sourcesArray.push([payLoad.source[i]]);
    // }

    //source

    drawTextAndLine(doc, "Source", doc.autoTable.previous.finalY + 20);
    if (payLoad.otherSource) {
      payLoad.source.push(payLoad.otherSource);
    }
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },

      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: payLoad.source
        .filter((source) => source !== "Other" && source !== "Autre")
        .map((sources) => [sources]),
    });
  }

  //DBA-MSM-EMFM-MEMS-MENT-MIAD-MIM DATA
  if (
    session.user.major === "DBA (Doctorate in Business Administration)" ||
    session.user.major ===
      "MSM (Mastère de Spécialisation en Marketing et Communication)" ||
    session.user.major === "EMFM (Executive Master in Financial Management)" ||
    session.user.major === "MEMS (Master Executif en Management de la Santé)" ||
    session.user.major === "MENT (Masters in Entrepreneurship)" ||
    session.user.major ===
      "MIAD (Master in International Affairs and Diplomacy)" ||
    session.user.major === "MIM (International Masters In Management)"
  ) {
    //languages
    drawTextAndLine(
      doc,
      t("studentApp:language_pdf_title"),
      doc.autoTable.previous.finalY + 20
    );
    const language_body_forms = [
      [
        `${t("studentApp:languages_french")} `,
        payLoad.languages_french_proficiency,
      ],
      [
        `${t("studentApp:languages_english")} `,
        payLoad.languages_english_proficiency,
      ],
      [
        `${t("studentApp:languages_arabic")} `,
        payLoad.languages_arabic_proficiency,
      ],
    ];
    if (
      payLoad.languages_other_language &&
      payLoad.languages_other_proficiency
    ) {
      language_body_forms.push([
        payLoad.languages_other_language,
        payLoad.languages_other_proficiency,
      ]);
    }

    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
        },
      },
      columns: [{ width: "50%" }, { width: "50%" }],
      body: language_body_forms,
    });
    //Experience

    drawTextAndLine(
      doc,
      t("studentApp:experience_pdf_tittle"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,

      styles: {
        overflow: "linebreak",
        fontSize: 8,

        //halign: 'center',
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 200],
        fontStyle: "bold",
        lineWidth: 0.1,
        lineColor: [128, 128, 128],
        border: [true, true, true, true],
      },

      head: [
        [
          `${t("studentApp:experience_pdf_company")}`,
          `${t("studentApp:experience_pdf_startDate")}`,
          `${t("studentApp:experience_pdf_country")}`,
          `${t("studentApp:experience_pdf_experienceType")}`,
        ],
      ],
      bodyStyles: {
        cellWidth: "auto",
      },
      body: [
        [
          payLoad.experience_company === "Other" ||
          payLoad.experience_company === "Autre"
            ? payLoad.experience_otherCompany
              ? payLoad.experience_otherCompany
              : "---"
            : payLoad.experience_company
            ? payLoad.experience_company
            : "---",
          formatedStartDate === "Invalid Date" ? "---" : formatedStartDate,
          payLoad.experience_country ? payLoad.experience_country : "---",
          payLoad.experience_experienceType
            ? payLoad.experience_experienceType
            : "---",
        ],
      ],
    });
    //roles
    let textWidth =
      (doc.getStringUnitWidth(t("studentApp:experience_pdf_rolesAndTasks")) *
        doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    drawTextAndLine(
      doc,
      t("studentApp:experience_pdf_rolesAndTasks"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 10,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      margin: {
        left: textWidth + 40,
      },
      body: [
        [
          payLoad.experience_rolesAndTasks
            ? payLoad.experience_rolesAndTasks
            : "---",
        ],
      ],
    });
    //motivation
    drawTextAndLine(
      doc,
      t("studentApp:motivationletter"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.motivationletter]],
    });

    //source
    drawTextAndLine(doc, "Source", doc.autoTable.previous.finalY + 20);
    if (payLoad.otherSource) {
      payLoad.source.push(payLoad.otherSource);
    }
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      // columnStyles: {
      //   0: {
      //     cellWidth: 150,
      //   },
      // },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: payLoad.source
        .filter((source) => source !== "Other" && source !== "Autre")
        .map((sources) => [sources]),
    });

    //payment
    drawTextAndLine(
      doc,
      t("studentApp:payment_pdf"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 200,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },

      body: [
        [
          `${t("studentApp:payment_question_pdf")} `,
          payLoad.payment === "Other" || payLoad.payment === "Autre"
            ? payLoad.otherPayment
            : payLoad.payment,
        ],
      ],
    });

    //MBA EMBA DATA
  } else if (
    session.user.major === "MBA (Master in Business Administration)" ||
    session.user.major === "EMBA (Executive Masters in Business Administration)"
  ) {
    //languages
    drawTextAndLine(doc, t("studentApp:language_pdf_title"), 100);
    const language_body_mba = [
      [
        `${t("studentApp:languages_french")} `,
        payLoad.languages_french_proficiency,
      ],
      [
        `${t("studentApp:languages_english")} `,
        payLoad.languages_english_proficiency,
      ],
      [
        `${t("studentApp:languages_arabic")} `,
        payLoad.languages_arabic_proficiency,
      ],
    ];
    if (
      payLoad.languages_other_language &&
      payLoad.languages_other_proficiency
    ) {
      language_body_mba.push([
        payLoad.languages_other_language,
        payLoad.languages_other_proficiency,
      ]);
    }
    autoTable(doc, {
      theme: "grid",
      startY: 110,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 280,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },
      body: language_body_mba,
    });

    //Experience
    drawTextAndLine(doc, t("studentApp:experience_pdf_tittle"), 200);
    //start of table
    autoTable(doc, {
      theme: "grid",
      startY: 210,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 280,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },
      body: [
        [
          `${t("studentApp:experience_pdf_company")}`,
          payLoad.experience_company === "Other" ||
          payLoad.experience_company === "Autre"
            ? payLoad.experience_otherCompany
            : payLoad.experience_company,
        ],
        [
          `${t("studentApp:experience_pdf_jobTitle")}`,
          payLoad.experience_jobTitle,
        ],
        [`${t("studentApp:experience_pdf_startDate")}`, formatedStartDate],
        [
          `${t("studentApp:experience_pdf_directorsName")}`,
          payLoad.experience_directorsName,
        ],
        [
          `${t("studentApp:experience_pdf_hrDirectorsName")}`,
          (payLoad.experience_hrDirectorsName &&
            payLoad.experience_hrDirectorsName.trim()) ||
            "---",
        ],
        [
          `${t("studentApp:experience_pdf_webSite")}`,
          (payLoad.experience_webSite && payLoad.experience_webSite.trim()) ||
            "---",
        ],
        [`${t("studentApp:experience_pdf_city")}`, payLoad.experience_city],
        [
          `${t("studentApp:experience_pdf_building")}`,
          (payLoad.experience_building && payLoad.experience_building.trim()) ||
            "---",
        ],
        [`${t("studentApp:experience_pdf_floor")}`, payLoad.experience_floor],
        [`${t("studentApp:experience_pdf_street")}`, payLoad.experience_street],
        [
          `${t("studentApp:experience_pdf_region")}`,
          (payLoad.experience_region && payLoad.experience_region.trim()) ||
            "---",
        ],
        [
          `${t("studentApp:experience_pdf_country")}`,
          payLoad.experience_country,
        ],
        [`${t("studentApp:experience_pdf_phone")}`, payLoad.experience_phone],
        [
          `${t("studentApp:experience_pdf_postal")}`,
          (payLoad.experience_postal && payLoad.experience_postal.trim()) ||
            "---",
        ],
        [
          `${t("studentApp:experience_pdf_numberOfEmployees")}`,
          payLoad.experience_numberOfEmployees,
        ],
        [
          `${t("studentApp:experience_pdf_numberOfEmployeesManaged")}`,
          payLoad.experience_numberOfEmployeesManaged,
        ],
        [
          `${t("studentApp:experience_pdf_turnover")}`,
          (payLoad.experience_turnover && payLoad.experience_turnover + "$") ||
            "---",
        ],
        [
          `${t("studentApp:experience_pdf_annualIncome")}`,
          payLoad.experience_annualIncome + "$",
        ],
        [
          `${t("studentApp:experience_pdf_monthlySalary")}`,
          payLoad.experience_monthlySalary + "$",
        ],
        [
          `${t("studentApp:experience_pdf_workOnSaturday")}`,
          payLoad.experience_workOnSaturday,
        ],
        [
          `${t("studentApp:experience_pdf_position")}`,
          payLoad.experience_position,
        ],
        [
          `${t("studentApp:experience_pdf_functionalArea")}`,
          payLoad.experience_functionalArea,
        ],
        [
          `${t("studentApp:experience_pdf_businessActivity")}`,
          payLoad.experience_businessActivity,
        ],
        [
          `${t("studentApp:experience_pdf_years")}`,
          `${payLoad.experience_years_totalYears}` +
            " - " +
            `${payLoad.experience_years_totalMonths}`,
        ],
      ],
    });
    //end table

    //Questions Section And Motivation
    doc.addPage();
    doc.setTextColor(0, 0, 200);
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);

    doc.text(t("studentApp:questions_pdf"), 300, 30, { align: "center" });
    doc.setFontSize(8);
    //question_currentJob
    drawTextAndLine(doc, t("studentApp:questions_pdf_currentJob"), 70);
    autoTable(doc, {
      theme: "striped",
      startY: 80,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_currentJob]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end

    //question_otherActivities
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_otherActivities"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_otherActivities]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end
    //questions_acheivement
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_acheivement"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_acheivement]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end
    //questions_reason
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_reason"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_reason]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end
    //questions carrerObjectives
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_careerObjectives"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_careerObjectives]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end

    //questions interests
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_interests"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_interests]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end

    //questions selfDescription
    drawTextAndLine(
      doc,
      t("studentApp:questions_pdf_selfDescription"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "striped",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      columnStyles: {
        0: {
          cellWidth: "auto",
        },
      },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: [[payLoad.questions_selfDescription]],
      //  didDrawPage: function(data) {
      //       if (data.pageCount > 1) {
      //           doc.addPage();
      //       }
      //     }
    });
    //end

    // as per owner's request removed the motivation letter section for EMBA,on 1/12/2023
    if (session.user.major === "MBA (Master in Business Administration)") {
      //motivation
      drawTextAndLine(
        doc,
        t("studentApp:motivationletter"),
        doc.autoTable.previous.finalY + 20
      );
      autoTable(doc, {
        theme: "striped",
        startY: doc.autoTable.previous.finalY + 30,
        styles: {
          overflow: "linebreak",
          fontSize: 8,
        },
        columnStyles: {
          0: {
            cellWidth: "auto",
          },
        },
        bodyStyles: {
          fillColor: [236, 240, 241],
          textColor: 20,
        },
        body: [[payLoad.motivationletter]],
        //  didDrawPage: function(data) {
        //       if (data.pageCount > 1) {
        //           doc.addPage();
        //       }
        //     }
      });
    }
    //source
    drawTextAndLine(doc, "Source", doc.autoTable.previous.finalY + 20);
    if (payLoad.otherSource) {
      payLoad.source.push(payLoad.otherSource);
    }
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
      },
      // columnStyles: {
      //   0: {
      //     cellWidth: 150,
      //   },
      // },
      bodyStyles: {
        fillColor: [236, 240, 241],
        textColor: 20,
      },
      body: payLoad.source
        .filter((source) => source !== "Other" && source !== "Autre")
        .map((sources) => [sources]),
    });

    //payment
    drawTextAndLine(
      doc,
      t("studentApp:payment_pdf"),
      doc.autoTable.previous.finalY + 20
    );
    autoTable(doc, {
      theme: "grid",
      startY: doc.autoTable.previous.finalY + 30,
      styles: {
        overflow: "linebreak",
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: {
          textColor: [0, 0, 200],
          fontStyle: "bold",
          cellWidth: 280,
        },
        1: {
          fontStyle: "bold",
          cellWidth: "auto",
        },
      },
      body: [
        [
          `${t("studentApp:payment_question_pdf")} `,
          payLoad.payment === "Other" || payLoad.payment === "Autre"
            ? payLoad.otherPayment
            : payLoad.payment,
        ],
      ],
    });
  }

  doc.addPage();

  // // Image and Document Section
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, "bold");
  doc.setFontSize(8);
  //Profile Passport Cv Document Section
  doc.addImage(payLoad.profileUrl, "PNG", 50, 20, 500, 500, undefined, "FAST");

  // start of passport data
  if (payLoad.docPassportUrl.endsWith(".pdf")) {
    doc.addPage();
    try {
      // Load the PDF file using pdfjsLib
      // console.log('what is the type', typeof payLoad.docPassportUrl);

      const pdf = await pdfjsLib.getDocument(payLoad.docPassportUrl).promise;

      // loop through each page of the PDF
      for (let i = 1; i <= pdf.numPages; i++) {
        // Get the page
        const page = await pdf.getPage(i);

        // page dimensions
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // render the page as an image
        await page.render({
          format: "png",
          canvasContext: context,
          viewport,
        }).promise;
        const imagePassportData = canvas.toDataURL("image/png");
        // const pagewidth=doc.internal.pageSize.width;
        // const pageheight=doc.internal.pageSize.height;
        // const imageWidth = doc.getImageProperties(imagePassportData).width;
        // const imageHeight = doc.getImageProperties(imagePassportData).height;
        // const x = (pagewidth - imageWidth) / 2;
        // const y = (pageheight - imageHeight) / 2;

        // add the rendered page to the PDF document
        doc.addImage(
          imagePassportData,
          "PNG",
          50,
          20,
          500,
          500,
          undefined,
          "FAST"
        );

        // add a new page if the current page is not the last one
        if (i < pdf.numPages) {
          doc.addPage();
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else if (
    payLoad.docPassportUrl.endsWith(".png") ||
    payLoad.docPassportUrl.endsWith(".jpeg") ||
    payLoad.docPassportUrl.endsWith(".jpg")
  ) {
    // add the rendered page to the PDF document
    doc.addPage();

    doc.addImage(
      payLoad.docPassportUrl,
      "PNG",
      50,
      20,
      500,
      500,
      undefined,
      "FAST"
    );
  }
  //end of passport data

  //start of cv data
  if (payLoad.docCVUrl.endsWith(".pdf")) {
    doc.addPage();
    try {
      // Load the PDF file using pdfjsLib
      const pdf = await pdfjsLib.getDocument(payLoad.docCVUrl).promise;

      // loop through each page of the PDF
      for (let i = 1; i <= pdf.numPages; i++) {
        // get the page
        const page = await pdf.getPage(i);

        // page dimensions
        const scale = 2;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // render the page as an image
        await page.render({
          format: "png",
          canvasContext: context,
          viewport,
        }).promise;
        const imageCVData = canvas.toDataURL("image/png");
        const pagewidth = doc.internal.pageSize.width;
        const pageheight = doc.internal.pageSize.height;

        // add the rendered page to the PDF document
        doc.addImage(
          imageCVData,
          "PNG",
          0,
          0,
          pagewidth,
          pageheight,
          undefined,
          "FAST"
        );

        // add a new page if the current page is not the last one
        if (i < pdf.numPages) {
          doc.addPage();
        }
      }
    } catch (error) {
      console.error(error);
    }
  } else if (
    payLoad.docCVUrl.endsWith(".png") ||
    payLoad.docCVUrl.endsWith(".jpeg") ||
    payLoad.docCVUrl.endsWith(".jpg")
  ) {
    // Add a new page to the PDF document
    doc.addPage();
    const pagewidthPng = doc.internal.pageSize.width;
    const pageheightPng = doc.internal.pageSize.height;
    doc.addImage(
      payLoad.docCVUrl,
      "PNG",
      0,
      0,
      pagewidthPng,
      pageheightPng,
      undefined,
      "FAST"
    );
  }

  //end Profile Passport Cv Document Section

  //DBA Document Section
  //Research Document
  if (session.user.major === "DBA (Doctorate in Business Administration)") {
    if (payLoad.docResearchUrl.endsWith(".pdf")) {
      doc.addPage();
      try {
        // Load the PDF file using pdfjsLib
        const pdf = await pdfjsLib.getDocument(payLoad.docResearchUrl).promise;

        // loop through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // get the page
          const page = await pdf.getPage(i);

          // page dimensions
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // render the page as an image
          await page.render({
            format: "png",
            canvasContext: context,
            viewport,
          }).promise;
          const imageResearchData = canvas.toDataURL("image/png");
          const pagewidth = doc.internal.pageSize.width;
          const pageheight = doc.internal.pageSize.height;

          // add the rendered page to the PDF document
          doc.addImage(
            imageResearchData,
            "PNG",
            0,
            0,
            pagewidth,
            pageheight,
            undefined,
            "FAST"
          );

          // add a new page if the current page is not the last one
          if (i < pdf.numPages) {
            doc.addPage();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      payLoad.docResearchUrl.endsWith(".png") ||
      payLoad.docResearchUrl.endsWith(".jpeg") ||
      payLoad.docResearchUrl.endsWith(".jpg")
    ) {
      // Add a new page to the PDF document
      doc.addPage();
      const pagewidthPng = doc.internal.pageSize.width;
      const pageheightPng = doc.internal.pageSize.height;
      doc.addImage(
        payLoad.docResearchUrl,
        "PNG",
        0,
        0,
        pagewidthPng,
        pageheightPng,
        undefined,
        "FAST"
      );
    }
  }
  //end DBA Document section

  //MSM-EMFM-MEMS-MBA-EMBA Document Section
  //Recommandation Letter

  //as per the owner’s request,removed recommendation letter for MBA and EMBA,on 1/12/2023
  if (
    session.user.major ===
      "MSM (Mastère de Spécialisation en Marketing et Communication)" ||
    session.user.major === "EMFM (Executive Master in Financial Management)" ||
    session.user.major === "MEMS (Master Executif en Management de la Santé)"
    // || session.user.major==="MBA (Master in Business Administration)"
    // || session.user.major==="EMBA (Executive Masters in Business Administration)"
  ) {
    if (payLoad.docRecommandationLetterUrl.endsWith(".pdf")) {
      doc.addPage();
      try {
        // Load the PDF file using pdfjsLib
        const pdf = await pdfjsLib.getDocument(
          payLoad.docRecommandationLetterUrl
        ).promise;

        // loop through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // get the page
          const page = await pdf.getPage(i);

          // page dimensions
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // render the page as an image
          await page.render({
            format: "png",
            canvasContext: context,
            viewport,
          }).promise;
          const imageRecommandationData = canvas.toDataURL("image/png");
          const pagewidth = doc.internal.pageSize.width;
          const pageheight = doc.internal.pageSize.height;

          // add the rendered page to the PDF document
          doc.addImage(
            imageRecommandationData,
            "PNG",
            0,
            0,
            pagewidth,
            pageheight,
            undefined,
            "FAST"
          );

          // add a new page if the current page is not the last one
          if (i < pdf.numPages) {
            doc.addPage();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      payLoad.docRecommandationLetterUrl.endsWith(".png") ||
      payLoad.docRecommandationLetterUrl.endsWith(".jpeg") ||
      payLoad.docRecommandationLetterUrl.endsWith(".jpg")
    ) {
      // Add a new page to the PDF document
      doc.addPage();
      const pagewidthPng = doc.internal.pageSize.width;
      const pageheightPng = doc.internal.pageSize.height;
      doc.addImage(
        payLoad.docRecommandationLetterUrl,
        "PNG",
        0,
        0,
        pagewidthPng,
        pageheightPng,
        undefined,
        "FAST"
      );
    }
  }
  //end MSM-EMFM-MEMS-MBA-EMBA Document Section

  //MENT-MIAD-MIM Document Section
  if (
    session.user.major === "MENT (Masters in Entrepreneurship)" ||
    session.user.major ===
      "MIAD (Master in International Affairs and Diplomacy)" ||
    session.user.major === "MIM (International Masters In Management)"
  ) {
    //ProofOfM1
    if (payLoad.docProofOfM1Url.endsWith(".pdf")) {
      doc.addPage();
      try {
        // Load the PDF file using pdfjsLib
        const pdf = await pdfjsLib.getDocument(payLoad.docProofOfM1Url).promise;

        // loop through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // get the page
          const page = await pdf.getPage(i);

          // page dimensions
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // render the page as an image
          await page.render({
            format: "png",
            canvasContext: context,
            viewport,
          }).promise;
          const imageProofData = canvas.toDataURL("image/png");
          const pagewidth = doc.internal.pageSize.width;
          const pageheight = doc.internal.pageSize.height;

          // add the rendered page to the PDF document
          doc.addImage(
            imageProofData,
            "PNG",
            0,
            0,
            pagewidth,
            pageheight,
            undefined,
            "FAST",
            undefined,
            "FAST"
          );

          // add a new page if the current page is not the last one
          if (i < pdf.numPages) {
            doc.addPage();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      payLoad.docProofOfM1Url.endsWith(".png") ||
      payLoad.docProofOfM1Url.endsWith(".jpeg") ||
      payLoad.docProofOfM1Url.endsWith(".jpg")
    ) {
      // Add a new page to the PDF document
      doc.addPage();
      const pagewidthPng = doc.internal.pageSize.width;
      const pageheightPng = doc.internal.pageSize.height;
      doc.addImage(
        payLoad.docProofOfM1Url,
        "PNG",
        0,
        0,
        pagewidthPng,
        pageheightPng,
        undefined,
        "FAST"
      );
    }

    //BACCertificate
    if (payLoad.docBACCertificateUrl.endsWith(".pdf")) {
      doc.addPage();
      try {
        // Load the PDF file using pdfjsLib
        const pdf = await pdfjsLib.getDocument(payLoad.docBACCertificateUrl)
          .promise;

        // loop through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // get the page
          const page = await pdf.getPage(i);

          // page dimensions
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // render the page as an image
          await page.render({
            format: "png",
            canvasContext: context,
            viewport,
          }).promise;
          const imageBACCData = canvas.toDataURL("image/png");
          const pagewidth = doc.internal.pageSize.width;
          const pageheight = doc.internal.pageSize.height;

          // add the rendered page to the PDF document
          doc.addImage(
            imageBACCData,
            "PNG",
            0,
            0,
            pagewidth,
            pageheight,
            undefined,
            "FAST"
          );

          // add a new page if the current page is not the last one
          if (i < pdf.numPages) {
            doc.addPage();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      payLoad.docBACCertificateUrl.endsWith(".png") ||
      payLoad.docBACCertificateUrl.endsWith(".jpeg") ||
      payLoad.docBACCertificateUrl.endsWith(".jpg")
    ) {
      // Add a new page to the PDF document
      doc.addPage();
      const pagewidthPng = doc.internal.pageSize.width;
      const pageheightPng = doc.internal.pageSize.height;
      doc.addImage(
        payLoad.docBACCertificateUrl,
        "PNG",
        0,
        0,
        pagewidthPng,
        pageheightPng,
        undefined,
        "FAST"
      );
    }

    //Transcript
    if (payLoad.docTranscriptUrl.endsWith(".pdf")) {
      doc.addPage();
      try {
        // Load the PDF file using pdfjsLib
        const pdf = await pdfjsLib.getDocument(payLoad.docTranscriptUrl)
          .promise;

        // loop through each page of the PDF
        for (let i = 1; i <= pdf.numPages; i++) {
          // get the page
          const page = await pdf.getPage(i);

          // page dimensions
          const scale = 2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // render the page as an image
          await page.render({
            format: "png",
            canvasContext: context,
            viewport,
          }).promise;
          const imageTranscriptData = canvas.toDataURL("image/png");
          const pagewidth = doc.internal.pageSize.width;
          const pageheight = doc.internal.pageSize.height;

          // add the rendered page to the PDF document
          doc.addImage(
            imageTranscriptData,
            "PNG",
            0,
            0,
            pagewidth,
            pageheight,
            undefined,
            "FAST"
          );

          // add a new page if the current page is not the last one
          if (i < pdf.numPages) {
            doc.addPage();
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (
      payLoad.docTranscriptUrl.endsWith(".png") ||
      payLoad.docTranscriptUrl.endsWith(".jpeg") ||
      payLoad.docTranscriptUrl.endsWith(".jpg")
    ) {
      // Add a new page to the PDF document
      doc.addPage();
      const pagewidthPng = doc.internal.pageSize.width;
      const pageheightPng = doc.internal.pageSize.height;
      doc.addImage(
        payLoad.docTranscriptUrl,
        "PNG",
        0,
        0,
        pagewidthPng,
        pageheightPng,
        undefined,
        "FAST"
      );
    }
  }

  //end MENT-MIAD-MIM Document Section
  //end Document

  // submit document with the full name
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(500, 800, `Page ${i} of ${pageCount}`);
  }

  // Set the saving path
  // const uploadDir = join(
  //     process.env.ROOT_DIR || process.cwd(),
  //     `${selection_data.upload_file_directory_name}${dateFn.format(
  //       Date.now(),
  //       'dd-MM-Y'
  //     )}/`
  // );
  // Changed by KANSO Adi 05-02-2023 to capture well the name in the archive section

  const reportName = `${payLoad.fname}_${payLoad.lname}_${session.user.ID}_${
    session.user.promotion
  }_Application_${dateFn.format(Date.now(), "dd-MM-yyyy")}.pdf`;

  // const reportName = `${payLoad.fname}_${payLoad.lname}-${
  //   session.user.ID
  // }-Application-${dateFn.format(Date.now(), 'dd-MM-Y')}.pdf`;

  doc.save(reportName);

  // doc.save(reportName, { returnPromise: true }).then(alert('PDF render all done!'));

  // doc.output("dataurlnewwindow");

  // send Report to Cloud
  let reportAsblob = doc.output("blob");
  // console.log("reportAsblob",reportAsblob)
  const reportData = new FormData();
  reportData.append("file", reportAsblob);

  //  const reportServer=doc.output('blob')

  // // console.log('reportname=>', reportAsblob);
  const appReportName = `report-${session.user.ID}.pdf`;
  const publicId = `users/${session.user.name}-${session.user.ID}/student/${appReportName}`;
  reportData.append("public_id", publicId);
  reportData.append("upload_preset", selection_data.upload_preset);
  try {
    let reportURL = await axios
      .post(selection_data.cloudinary_document_url, reportData)
      .then((res) => res.data.secure_url);
    // // console.log('reportURL=',reportURL);
    reportURL = await axios
      .post("/api/CRUD_Op/sendreport", {
        reportURL,
      })
      .then((res) => res.data.reportURL);
    // console.log('reportURLServers=',reportURL)
    return reportURL;
  } catch (error) {
    console.error(error);
  }
  // return reportURL;
  //jsPdf end
}

export default convertFormToPdf;
