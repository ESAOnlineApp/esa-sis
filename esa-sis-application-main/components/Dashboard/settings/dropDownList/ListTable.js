/*
 * Created By: Jaber Mohamad/MohammadYassine
 * Project: SIS Application
 * File: components/Admin/settings/dropDownList/DropDownList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import selection_data from '../../../../utilities/selection_data';
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import encrypt from "../../../../utilities/encrypt_decrypt/encryptText";
import decrypt from "../../../../utilities/encrypt_decrypt/decryptText";
import { ErrorMessage } from "../../WarningMessage";

const ListTable = ({ value }) => {
  const [pageSize, setPageSize] = useState(5);
  const [payments, setPayments] = useState([]);
  const [degreelevelBBA, setDegreelevelBBA] = useState([]);
  const [school, setSchool] = useState([]);
  const [business_activity, setBusiness_activity] = useState([]);
  const [functionalarea, setFunctionalarea] = useState([]);
  const [experience_position, setExperience_position] = useState([]);
  const [experience_type, setExperience_type] = useState([]);
  const [companyitem, setCompanyitem] = useState([]);
  const [source, setSource] = useState([]);
  const [baccalaureate_option, setBaccalaureate_option] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [degreelevel, setDegreelevel] = useState([]);
  const [fieldofstudy, setFieldofstudy] = useState([]);
  const [university, setUniversity] = useState([]);
  const [diseasetype, setDiseasetype] = useState([]);
  const [major, setMajor] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const handleOpenErrorMessage = () => {
    setOpenErrorMessage(true);
  };

  const handleCloseErroMessage = () => {
    setOpenErrorMessage(false);
  };

  useEffect(() => {
    //fetching Dropdown items
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/controller/Dropdownitems?major=All"
        );
        const incomingData = JSON.parse(decrypt(response.data.data));
        if (response.status === 200) {
          setMajor(incomingData.majors);
          setRelationship(incomingData.relationship);
          setDegreelevel(incomingData.degreelevel);
          setDegreelevelBBA(incomingData.degree_level_bba);
          setSchool(incomingData.institution);
          setFieldofstudy(incomingData.discipline);
          setBaccalaureate_option(incomingData.baccalaureate_option);
          setUniversity(incomingData.university);
          setCompanyitem(incomingData.company_name);
          setDiseasetype(incomingData.healthproblem);
          setPayments(incomingData.payment);
          setSource(incomingData.source);
          setFunctionalarea(incomingData.functionalarea);
          setExperience_type(incomingData.experience_type);
          setExperience_position(incomingData.experience_position);
          setBusiness_activity(incomingData.business_activity);
          //setdropdownListCreated(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // const AcademicProgram = [
  //   {
  //     id: 1,
  //     en: 'BBA (Bachelor in Business Administration)',
  //     fr: 'BBA (Bachelor in Business Administration)',
  //   },
  //   {
  //     id: 2,
  //     en: 'DBA (Doctorate in Business Administration)',
  //     fr: 'DBA (Doctorate in Business Administration)',
  //   },

  // ];
  const Major = major.slice(1).map((item) => {
    return {
      id: item.major_id,
      en: item.program,
      fr: item.program,
      promotion: item.current_applicants_promotion,
    };
  });
  const Payments = payments.slice(1).map((item) => {
    return {
      id: item.payment_id,
      en: item.payment_eng,
      fr: item.payment_fr,
    };
  });
  const DegreelevelBBA = degreelevelBBA.slice(1).map((item) => {
    return {
      id: item.degreelevel_id,
      en: item.degreelevel_eng,
      fr: item.degreelevel_fr,
    };
  });
  const School = school.slice(1).map((item) => {
    return {
      id: item.instituation_id,
      en: item.instituation_eng,
      fr: item.instituation_fr,
    };
  });
  const BusinessActivity = business_activity.slice(1).map((item) => {
    return {
      id: item.activity_id,
      en: item.activity_eng,
      fr: item.activity_fr,
    };
  });
  const Functionalarea = functionalarea.slice(1).map((item) => {
    return {
      id: item.area_id,
      en: item.area_eng,
      fr: item.area_fr,
    };
  });
  const Experience_position = experience_position.slice(1).map((item) => {
    return {
      id: item.position_id,
      en: item.position_eng,
      fr: item.position_fr,
    };
  });
  const Experience_type = experience_type.slice(1).map((item) => {
    return {
      id: item.type_id,
      en: item.type_eng,
      fr: item.type_fr,
    };
  });
  const Companyitem = companyitem.slice(1).map((item) => {
    return {
      id: item.name_id,
      en: item.name_eng,
      fr: item.name_fr,
    };
  });
  const Source = source.map((item) => {
    return {
      id: item.source_id,
      en: item.source_eng,
      fr: item.source_fr,
    };
  });
  const Baccalaureate_option = baccalaureate_option.slice(1).map((item) => {
    return {
      id: item.baccalaureateoption_id,
      en: item.baccalaureate_eng,
      fr: item.baccalaureate_fr,
    };
  });
  const Relationship = relationship.slice(1).map((item) => {
    return {
      id: item.relationship_id,
      en: item.relationship_eng,
      fr: item.relationship_fr,
    };
  });
  const Degreelevel = degreelevel.slice(1).map((item) => {
    return {
      id: item.degreelevel_id,
      en: item.degreelevel_eng,
      fr: item.degreelevel_fr,
    };
  });
  const Fieldofstudy = fieldofstudy.slice(1).map((item) => {
    return {
      id: item.discipline_id,
      en: item.discipline_eng,
      fr: item.discipline_fr,
    };
  });
  const University = university.slice(1).map((item) => {
    return {
      id: item.university_id,
      en: item.university_eng,
      fr: item.university_fr,
    };
  });
  const Diseasetype = diseasetype.slice(1).map((item) => {
    return {
      id: item.healthproblem_id,
      en: item.healthproblem_eng,
      fr: item.healthproblem_fr,
    };
  });
  // // console.log(Payments)
  const handleSave = async (
    dataType,
    id,
    eng,
    fr,
    promotion,
    tablename,
    columeng,
    columfr,
    tableid
  ) => {
    if (dataType === "Academic Program") {
      tablename = "major";
      tableid = "major_id";
      (columeng = "program"), (columfr = "programfr");
    } else if (dataType === "Payment") {
      tablename = "payment";
      tableid = "payment_id";
      (columeng = "payment_eng"), (columfr = "payment_fr");
    } else if (dataType === "Business Activity") {
      tablename = "business_activity";
      tableid = "activity_id";
      (columeng = "activity_eng"), (columfr = "activity_fr");
    } else if (dataType === "Functional Area") {
      tablename = "functionalarea";
      tableid = "area_id";
      (columeng = "area_eng"), (columfr = "area_fr");
    } else if (dataType === "Position") {
      tablename = "experience_position";
      tableid = "position_id";
      (columeng = "position_eng"), (columfr = "position_fr");
    } else if (dataType === "Experience Type") {
      tablename = "experience_type";
      tableid = "type_id";
      (columeng = "type_eng"), (columfr = "type_fr");
    } else if (dataType === "Company") {
      tablename = "company_name";
      tableid = "name_id";
      (columeng = "name_eng"), (columfr = "name_fr");
    } else if (dataType === "Source") {
      tablename = "source";
      tableid = "source_id";
      (columeng = "source_eng"), (columfr = "source_fr");
    } else if (dataType === "Education Baccalaureate Option") {
      tablename = "baccalaureate_option";
      tableid = "baccalaureateoption_id";
      (columeng = "baccalaureate_eng"), (columfr = "baccalaureate_fr");
    } else if (dataType === "Relationship") {
      tablename = "relationship";
      tableid = "relationship_id";
      (columeng = "relationship_eng"), (columfr = "relationship_fr");
    } else if (dataType === "Education Degree Level") {
      tablename = "degreelevel";
      tableid = "degreelevel_id";
      (columeng = "degreelevel_eng"), (columfr = "degreelevel_fr");
    } else if (dataType === "Emergency Contact Disease Type") {
      tablename = "healthproblem";
      tableid = "healthproblem_id";
      (columeng = "healthproblem_eng"), (columfr = "healthproblem_fr");
    } else if (dataType === "Field of Study") {
      tablename = "discipline";
      tableid = "discipline_id";
      (columeng = "discipline_eng"), (columfr = "discipline_fr");
    } else if (dataType === "Education Universities") {
      tablename = "university";
      tableid = "university_id";
      (columeng = "university_eng"), (columfr = "university_fr");
    } else if (dataType === "Education Degree Level BBA") {
      tablename = "degree_level_bba";
      tableid = "degreelevel_id";
      (columeng = "degreelevel_eng"), (columfr = "degreelevel_fr");
    } else if (dataType === "Education Institution") {
      tablename = "institution";
      tableid = "instituation_id";
      (columeng = "instituation_eng"), (columfr = "instituation_fr");
    }
    let payload = {
      tablename: tablename,
      tableid: tableid,
      id: id,
      eng: eng,
      fr: fr,
      columeng: columeng,
      columfr: columfr,
    };

    if (tablename === "major") {
      payload.promotion = promotion;
    }
    const encryptedBody = encrypt(JSON.stringify(payload));
    try {
      const result = await axios.put(`/api/admin/setting/edit`, {
        data: encryptedBody,
      });
      if (result.status === 200) {
        null;
      }
      return result.data;
    } catch (error) {
      console.error(error);
      return {
        message: "Failed to Update table",
      };
    }
  };
  const handleDelete = async (dataType, id, tablename, tableid) => {
    if (dataType === "Academic Program") {
      tablename = "major";
      tableid = "major_id";
    } else if (dataType === "Payment") {
      tablename = "payment";
      tableid = "payment_id";
    } else if (dataType === "Business Activity") {
      tablename = "business_activity";
      tableid = "activity_id";
    } else if (dataType === "Functional Area") {
      tablename = "functionalarea";
      tableid = "area_id";
    } else if (dataType === "Position") {
      tablename = "experience_position";
      tableid = "position_id";
    } else if (dataType === "Experience Type") {
      tablename = "experience_type";
      tableid = "type_id";
    } else if (dataType === "Company") {
      tablename = "company_name";
      tableid = "name_id";
    } else if (dataType === "Source") {
      tablename = "source";
      tableid = "source_id";
    } else if (dataType === "Education Baccalaureate Option") {
      tablename = "baccalaureate_option";
      tableid = "baccalaureateoption_id";
    } else if (dataType === "Relationship") {
      tablename = "relationship";
      tableid = "relationship_id";
    } else if (dataType === "Education Degree Level") {
      tablename = "degreelevel";
      tableid = "degreelevel_id";
    } else if (dataType === "Emergency Contact Disease Type") {
      tablename = "healthproblem";
      tableid = "healthproblem_id";
    } else if (dataType === "Field of Study") {
      tablename = "discipline";
      tableid = "discipline_id";
    } else if (dataType === "Education Universities") {
      tablename = "university";
      tableid = "university_id";
    } else if (dataType === "Education Degree Level BBA") {
      tablename = "degree_level_bba";
      tableid = "degreelevel_id";
    } else if (dataType === "Education Institution") {
      tablename = "institution";
      tableid = "instituation_id";
    }
    const payload = {
      dataType: dataType,
      tableid: tableid,
      tablename: tablename,
      id: id,
    };
    const encryptedBody = encrypt(JSON.stringify(payload));
    //// console.log(encryptedBody)
    try {
      const response = await axios.delete(`/api/admin/setting/delete`, {
        data: encryptedBody,
      });
      if (response.status === 200) {
        // Filter out the deleted item from the payments2 state
        if (dataType === "Academic Program") {
          setMajor((prevMajor) =>
            prevMajor.filter((major) => major.major_id !== id)
          );
        } else if (dataType === "Payment") {
          setPayments((prevPayments) =>
            prevPayments.filter((payments) => payments.payment_id !== id)
          );
        } else if (dataType === "Business Activity") {
          setBusiness_activity((prevBusiness_activity) =>
            prevBusiness_activity.filter(
              (business_activity) => business_activity.activity_id !== id
            )
          );
        } else if (dataType === "Functional Area") {
          setFunctionalarea((prevFunctionalarea) =>
            prevFunctionalarea.filter(
              (functionalarea) => functionalarea.area_id !== id
            )
          );
        } else if (dataType === "Position") {
          setExperience_position((prevExperience_position) =>
            prevExperience_position.filter(
              (experience_position) => experience_position.position_id !== id
            )
          );
        } else if (dataType === "Experience Type") {
          setExperience_type((prevExperience_type) =>
            prevExperience_type.filter(
              (experience_type) => experience_type.type_id !== id
            )
          );
        } else if (dataType === "Company") {
          setCompanyitem((prevCompanyitem) =>
            prevCompanyitem.filter((companyitem) => companyitem.name_id !== id)
          );
        } else if (dataType === "Source") {
          setSource((prevSource) =>
            prevSource.filter((source) => source.source_id !== id)
          );
        } else if (dataType === "Education Baccalaureate Option") {
          setBaccalaureate_option((prevBaccalaureate_option) =>
            prevBaccalaureate_option.filter(
              (baccalaureate_option) =>
                baccalaureate_option.baccalaureateoption_id !== id
            )
          );
        } else if (dataType === "Relationship") {
          setRelationship((prevRelationship) =>
            prevRelationship.filter(
              (relationship) => relationship.relationship_id !== id
            )
          );
        } else if (dataType === "Education Degree Level") {
          setDegreelevel((prevDegreelevel) =>
            prevDegreelevel.filter(
              (degreelevel) => degreelevel.degreelevel_id !== id
            )
          );
        } else if (dataType === "Emergency Contact Disease Type") {
          setDiseasetype((prevDiseasetyp) =>
            prevDiseasetyp.filter(
              (diseasetype) => diseasetype.healthproblem_id !== id
            )
          );
        } else if (dataType === "Field of Study") {
          setFieldofstudy((prevFieldofstudy) =>
            prevFieldofstudy.filter(
              (fieldofstudy) => fieldofstudy.discipline_id !== id
            )
          );
        } else if (dataType === "Education Universities") {
          setUniversity((prevUniversity) =>
            prevUniversity.filter(
              (university) => university.university_id !== id
            )
          );
        } else if (dataType === "Education Degree Level BBA") {
          setDegreelevelBBA((prevDegreelevelBBA) =>
            prevDegreelevelBBA.filter(
              (degreelevelBBA) => degreelevelBBA.degreelevel_id !== id
            )
          );
        } else if (dataType === "Education Institution") {
          setSchool((prevSchool) =>
            prevSchool.filter((school) => school.instituation_id !== id)
          );
        }
      }

      return response.data;
    } catch (error) {
      console.error(error);
      handleOpenErrorMessage();
      // alert('Column already used by a user,you cant delete it');

      return {
        message: "Failed to delete table",
      };
    }
  };

  //// console.log(await DeletefromDropdown('payment','payment_id',8,connection));
  //const [payments, setPayments] =  useState(Payments);
  //const [data, setData] = useState(AcademicProgram);

  //// console.log(Payments)

  const columns = [
    {
      field: "en",
      headerName: "EN",
      headerAlign: "center",
      align: "center",
      width: 440,
      editable: true,
    },
    {
      field: "fr",
      headerName: "FR",
      headerAlign: "center",
      align: "center",
      width: 440,
      editable: true,
    },
    ...(value === "Academic Program"
      ? [
          {
            field: "promotion",
            headerName: "Promotion",
            headerAlign: "center",
            align: "center",
            width: 440,
            editable: true,
          },
        ]
      : []),

    {
      field: "action",
      headerName: "Action",
      width: 130,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="bg-green-600 hover:bg-green-700 text-white w-[50px] p-1 font-bold rounded-lg"
            type="button"
            onClick={() =>
              handleSave(
                value,
                params.row.id,
                params.row.en,
                params.row.fr,
                params.row.promotion
              )
            }
          >
            <SaveOutlinedIcon />
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white w-[50px] p-1 font-bold rounded-lg"
            type="button"
            onClick={() => handleDelete(value, params.row.id)}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {value && (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(r) => r.id}
            rows={
              value === "Academic Program"
                ? Major
                : value === "Payment"
                ? Payments
                : value === "Business Activity"
                ? BusinessActivity
                : value === "Functional Area"
                ? Functionalarea
                : value === "Position"
                ? Experience_position
                : value === "Experience Type"
                ? Experience_type
                : value === "Company"
                ? Companyitem
                : value === "Source"
                ? Source
                : value === "Education Baccalaureate Option"
                ? Baccalaureate_option
                : value === "Relationship"
                ? Relationship
                : value === "Education Degree Level"
                ? Degreelevel
                : value === "Field of Study"
                ? Fieldofstudy
                : value === "Education Universities"
                ? University
                : value === "Emergency Contact Disease Type"
                ? Diseasetype
                : value === "Education Degree Level BBA"
                ? DegreelevelBBA
                : value === "Education Institution"
                ? School
                : []
            }
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
            onSelectionModelChange={setSelectedRows}
            disableSelectionOnClick
            components={{
              NoRowsOverlay: () => (
                <div className="grid h-[100%] place-items-center">No Data</div>
              ),
            }}
          />
          {selectedRows}
        </Box>
      )}
      {openErrorMessage && (
        <ErrorMessage
          handleOpenErrorMessage={handleOpenErrorMessage}
          handleCloseErroMessage={handleCloseErroMessage}
        />
      )}
    </>
  );
};

export default ListTable;
