import * as yup from "yup";
// import useTranslation from 'next-translate/useTranslation';

export const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    // .email('Enter a Valid Email')
    .required("Email is Required!"),
});

export const newPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password Must be at leat 8 characters.")
    .max(32)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is Required."),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password Doesn't Match!")
    .required("Password is Required!"),
});

export const studentInfoSchema_en = yup.object().shape({
  personalinfo_title: yup.string().trim().required("Please Select Title"),
  fname: yup.string().trim().required("Please Enter your First Name"),
  personalinfo_fathername: yup
    .string()
    .trim()
    .required("Please Enter your Father's Name"),
  lname: yup.string().trim().required("Please Enter your Last Name"),
  personalinfo_mothernname: yup
    .string()
    .trim()
    .required("Please enter Mother's name"),
  personalinfo_gender: yup.string().trim().required("Please Select Gender"),
  personalinfo_dob: yup
    .string("Enter your date of birth")
    .nullable()
    .required("Please enter Date of birth"),

  personalinfo_countryofbirth: yup
    .string()
    .trim()
    .required("Please select your Country of birth"),
  personalinfo_nationality_firstnationality: yup
    .string()
    .trim()
    .required("Please enter your Nationality"),
  personalinfo_maritalstatus: yup
    .string()
    .trim()
    .required("Please Select Your Marital Status"),
  personalinfo_placeofbirth: yup
    .string()
    .trim()
    .required("Please enter your Place of Birth"),
  personalinfo_registrationnumber: yup
    .number()
    .min("0", "Register number must be postive")
    .typeError("Enter a valid registration number")
    .required("Please enter your register number"),

  address_country: yup.string().trim().required("Please enter Country"),
  address_city: yup.string().trim().required("Please enter City"),
  address_building: yup.string().trim().required("Please enter Building"),
  address_street: yup.string().trim().required("Please enter Street"),
  address_floor: yup.string().trim().required("Please enter Floor"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid Email")
    .typeError("Enter a valid Email")
    .required("Please enter your Email"),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email("Enter a valid Email")
    .typeError("Enter a valid Email"),
  contactinfo_phonenumber_mobileNumber: yup
    .string("Enter a valid mobile number")
    .typeError("Enter a valid mobile number")
    .required("Please enter a mobile number"),
  contactinfo_phonenumber_landlineNumber: yup
    .string("Enter a valid phone number")
    .nullable()
    .typeError("Enter a valid mobile number"),

  emergencycontact_prefix: yup.string().trim().required("Please Select Prefix"),
  emergencycontact_firstname: yup
    .string()
    .trim()
    .required("Please enter your Emergency Contact First Name"),
  emergencycontact_middlename: yup
    .string()
    .trim()
    .required("Please enter your Emergency Contact Middel Name"),
  emergencycontact_lastname: yup
    .string()
    .trim()
    .required("Please enter your Emergency Contact Last Name"),
  emergencycontact_relationship: yup
    .string()
    .trim()
    .required("Please Select Relationship type"),
  emergencycontact_phonenumber: yup
    .string("Please enter emergency contact number")
    .typeError("Enter a valid Phone Number")
    .required("Please Enter Contact Phone Number"),
  emergencycontact_medicalhealth: yup
    .string()
    .trim()
    .nullable()
    .required("Please Specify Yes or No and if yes provide disease type."),
  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when("emergencycontact_medicalhealth", {
      is: (value) => value === "Yes",
      then: yup.string().trim().required("Please Provide disease type."),
    }),
  education_degreelevel: yup
    .string()
    .trim()
    .required("Please Select Degree Level"),
  education_baccalaureateoption: yup
    .string()
    .trim()
    .required("Please Select Baccalaureate"),
  education_yearofacquisition: yup
    .string()
    .trim()
    .typeError("Please Select Year")
    .required("Please Select Acquisition Year"),
  education_institution: yup
    .string()
    .trim()
    .required("Please Select Institute"),
  education_institution_other: yup
    .string()
    .trim()
    .when("education_institution", {
      is: (value) => value === "Other",
      then: yup.string().trim().required("Enter other Institution"),
    }),
  education_country: yup.string().trim().required("Please Select Country"),

  education_schoolgrades_second_math: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_hist: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_geo: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_mean: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Mean."),

  education_schoolgrades_second_range: yup
    .string()
    .trim()
    .typeError("Select Range Between 1 and 11")
    .required("Please Select Your Range."),

  education_schoolgrades_premiere_math: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_hist: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_geo: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_mean: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Mean."),

  education_schoolgrades_premiere_range: yup
    .string()
    .trim()
    .nullable()
    .typeError("Select Range Between 1 and 11")
    .required("Please Select Your Range."),

  education_schoolgrades_terminale_math: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_hist: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_geo: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_mean: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_sat: yup
    .number()
    .typeError("Enter a valid number")
    .nullable()
    .moreThan(0, "Sat Points Must Not Be Less Than 100")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  languages_french_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),
  languages_english_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),
  languages_arabic_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),

  languages_other_language: yup
    .string()
    .trim()
    .when("languages_other_proficiency", {
      is: (other) =>
        other === "Excelent" ||
        other === "Good" ||
        other === "Fair" ||
        other === "Fluent",
      then: yup.string().trim().required("Specify Other Language"),
    }),

  motivationletter: yup
    .string()
    .trim()
    .required("Please Fill Out Motivation Letter"),

  source: yup.array().of(yup.string()).min(1, "Please choose your source"),
  otherSource: yup
    .string()
    .trim()
    .when("source", {
      is: (name) => name.includes("Other"),
      then: yup.string().trim().required("Enter Other Source"),
    }),
});

export const studentInfoSchema_fr = yup.object().shape({
  personalinfo_title: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le titre"),
  fname: yup.string().trim().required("Please Enter your First Name"),
  personalinfo_fathername: yup
    .string()
    .trim()
    .required("Veuillez entrer le nom de votre père"),
  lname: yup.string().trim().required("Please Enter your Last Name"),
  personalinfo_mothernname: yup
    .string()
    .trim()
    .required("Veuillez entrer le nom de la mère"),

  personalinfo_gender: yup
    .string()
    .trim()
    .required("Veuillez Sélectionner Le Sexe"),

  personalinfo_dob: yup
    .string("Entrez votre date de naissance")
    .nullable()
    .required("Veuillez entrer la date de naissance"),

  personalinfo_countryofbirth: yup
    .string()
    .trim()
    .required("Veuillez sélectionner votre pays de naissance"),
  personalinfo_nationality_firstnationality: yup
    .string()
    .trim()
    .required("Veuillez saisir votre nationalité"),
  personalinfo_maritalstatus: yup
    .string()
    .trim()
    .required("Veuillez sélectionner votre état civil"),
  personalinfo_placeofbirth: yup
    .string()
    .trim()
    .required("Veuillez saisir votre lieu de naissance"),
  personalinfo_registrationnumber: yup
    .number()
    .min("0", "Le numéro de registre doit être positif")
    .typeError("Entrez un numéro de registre valide")
    .required("Veuillez entrer votre numéro de registre"),

  address_country: yup.string().trim().required("Veuillez saisir le pays"),
  address_city: yup.string().trim().required("Veuillez entrer la ville"),
  address_building: yup.string().trim().required("Veuillez saisir le bâtiment"),
  address_street: yup.string().trim().required("Veuillez entrer la rue"),
  address_floor: yup.string().trim().required("Veuillez saisir l`étage"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid Email")
    .typeError("Enter a valid Email")
    .required("Please enter your Email"),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email("Entrer un email valide")
    .typeError("Entrer un email valide"),
  contactinfo_phonenumber_mobileNumber: yup
    .string("Entrez un numéro de portable valide")
    .typeError("Entrez un numéro de portable valide")
    .required("Veuillez entrer un numéro de portable"),
  contactinfo_phonenumber_landlineNumber: yup
    .string("Entrez un numéro de téléphone valide")
    .nullable()
    .typeError("Entrez un numéro de portable valide"),

  emergencycontact_prefix: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le préfixe"),
  emergencycontact_firstname: yup
    .string()
    .trim()
    .required("Veuillez saisir le prénom de votre contact d`urgence"),
  emergencycontact_middlename: yup
    .string()
    .trim()
    .required("Veuillez entrer votre deuxième prénom de contact d`urgence"),
  emergencycontact_lastname: yup
    .string()
    .trim()
    .required("Veuillez saisir le nom de famille de votre contact d`urgence"),
  emergencycontact_relationship: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le type de relation"),
  emergencycontact_phonenumber: yup
    .string("Veuillez saisir le numéro d`urgence")
    .typeError("Entrez un numéro de téléphone valide")
    .required("Veuillez entrer le numéro de téléphone du contact"),
  emergencycontact_medicalhealth: yup
    .string()
    .trim()
    .nullable()
    .required(
      "Veuillez spécifier Oui ou Non et si oui, indiquez le type de maladie."
    ),

  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when("emergencycontact_medicalhealth", {
      is: (value) => value === "Yes",
      then: yup
        .string()
        .trim()
        .required("Veuillez indiquez le type de maladie."),
    }),

  education_degreelevel: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le niveau de diplôme"),
  education_baccalaureateoption: yup
    .string()
    .trim()
    .required("Veuillez sélectionner Baccalauréat"),
  education_yearofacquisition: yup
    .string()
    .trim()
    .typeError("Veuillez sélectionner l`année")
    .required("Veuillez sélectionner l`année d`acquisition"),
  education_institution: yup
    .string()
    .trim()
    .required("Veuillez sélectionner l`institut"),
  education_institution_other: yup
    .string()
    .trim()
    .when("education_institution", {
      is: (value) => value === "Autre",
      then: yup.string().trim().required("Entrer un autre institut"),
    }),
  education_country: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le pays"),
  education_schoolgrades_second_math: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_hist: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_geo: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_second_economie: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_mean: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Mean."),

  education_schoolgrades_second_range: yup
    .string()
    .trim()
    .nullable()
    .typeError("Select Range Between 1 and 11")
    .required("Please Select Your Range."),

  education_schoolgrades_premiere_math: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_hist: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_geo: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Grade."),

  education_schoolgrades_premiere_economie: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_mean: yup
    .number()
    .min(0, "Grade Must Not be less Than 1")
    .max(20, "Grade Must Not Exceed 20")
    .typeError("Enter Grade Between 1 and 20")
    .required("Please Fill the Required Mean."),

  education_schoolgrades_premiere_range: yup
    .string()
    .trim()
    .typeError("Select Range Between 1 and 11")
    .required("Please Select Your Range."),

  education_schoolgrades_terminale_math: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_hist: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_geo: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_mean: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_sat: yup
    .number()
    .typeError("Entrez une note valide")
    .nullable()
    .moreThan(100, "Sat Points Must Not Be Less Than 100")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  languages_french_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),
  languages_english_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),
  languages_arabic_proficiency: yup
    .string()
    .oneOf(["Excelent", "Good", "Fair", "Fluent"])
    .required(),
  languages_other_language: yup
    .string()
    .trim()
    .when("languages_other_proficiency", {
      is: (other) =>
        other === "Excelent" ||
        other === "Good" ||
        other === "Fair" ||
        other === "Fluent",
      then: yup.string().trim().required("Spécifier Une Autre Langue"),
    }),

  motivationletter: yup
    .string()
    .trim()
    .required("Veuillez Remplir la Lettre de Motivation."),
  source: yup.array().of(yup.string()).min(1, "Veuillez choisir votre source"),

  otherSource: yup
    .string()
    .trim()
    .when("source", {
      is: (name) => name.includes("Autre"),
      then: yup.string().trim().required("Entrez la source"),
    }),
});

export const studentSaveInfoSchema_en = yup.object().shape({
  personalinfo_title: yup.string().trim(),
  fname: yup.string().trim(),
  personalinfo_fathername: yup.string().trim(),
  lname: yup.string().trim(),
  personalinfo_mothernname: yup.string().trim(),
  personalinfo_gender: yup.string().trim(),
  // personalinfo_dob: yup
  //   .string("Enter your date of birth")
  //   .matches(dateisValid, "Enter a valid date of birth (DD/MM/YYYY)"),

  personalinfo_countryofbirth: yup.string().trim(),
  personalinfo_nationality_firstnationality: yup.string().trim(),
  personalinfo_maritalstatus: yup.string().trim(),
  personalinfo_placeofbirth: yup.string().trim(),
  personalinfo_registrationnumber: yup
    .number()
    .typeError("Enter a valid number")
    .nullable()
    .moreThan(0, "Registery Number Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  address_city: yup.string().trim(),
  address_country: yup.string().trim(),
  address_building: yup.string().trim(),
  address_street: yup.string().trim(),
  address_floor: yup.string().trim(),

  email: yup
    .string()
    .trim()
    .email("Enter a valid Email")
    .typeError("Enter a valid Email"),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email("Enter a valid Email")
    .typeError("Enter a valid Email"),
  contactinfo_phonenumber_mobileNumber: yup
    .string("Enter a valid mobile number")
    .typeError("Enter a valid mobile number"),
  contactinfo_phonenumber_landlineNumber: yup
    .string("Enter a valid phone number")
    .nullable()
    .typeError("Enter a valid mobile number"),

  emergencycontact_prefix: yup.string().trim(),
  emergencycontact_firstname: yup.string().trim(),
  emergencycontact_middlename: yup.string().trim(),
  emergencycontact_lastname: yup.string().trim(),
  emergencycontact_relationship: yup.string().trim(),
  emergencycontact_phonenumber: yup
    .string("Please enter emergency contact number")
    .typeError("Enter a valid Phone Number")
    .nullable(),
  emergencycontact_medicalhealth: yup.string().trim().nullable(),
  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when("emergencycontact_medicalhealth", {
      is: (value) => value === "Yes",
      then: yup.string().trim(),
    }),

  education_degreelevel: yup.string().trim(),
  education_baccalaureateoption: yup.string().trim(),
  education_yearofacquisition: yup
    .string()
    .trim()
    .nullable()
    .typeError("Please Select Year"),
  education_institution: yup.string().trim(),
  education_institution_other: yup
    .string()
    .trim()
    .when("education_institution", {
      is: (value) => value === "Other",
      then: yup.string().trim(),
    }),
  education_country: yup.string().trim(),

  education_schoolgrades_second_math: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_hist: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_geo: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_mean: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_schoolgrades_premiere_math: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_hist: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_geo: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_mean: yup
    .number()
    .typeError("Enter a valid number")
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .lessThan(20, "Grade Must Be 20 or Less. ")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_schoolgrades_terminale_math: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_hist: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_geo: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_economie: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_mean: yup
    .number()
    .typeError("Enter a valid number")
    .max(20)
    .nullable()
    .moreThan(0, "Grade Must Not Be Less Than 1 or Negative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_sat: yup
    .number()
    .typeError("Enter Valid Sat points.")
    .nullable()
    .moreThan(100, "Sat Points Must Not Be Less Than 100")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  motivationletter: yup.string().trim(),
  source: yup.array().of(yup.string()),
  otherSource: yup.string().trim(),
});

export const studentSaveInfoSchema_fr = yup.object().shape({
  personalinfo_title: yup.string().trim(),
  fname: yup.string().trim(),
  personalinfo_fathername: yup.string().trim(),
  lname: yup.string().trim(),
  personalinfo_mothernname: yup.string().trim(),
  personalinfo_gender: yup.string().trim(),
  // personalinfo_dob: yup
  //   .string("Entrez votre date de naissance")
  //   .matches(dateisValid, "Entrez une date de naissance valide(DD/MM/YYYY)"),

  personalinfo_countryofbirth: yup.string().trim(),
  personalinfo_nationality_firstnationality: yup.string().trim(),
  personalinfo_maritalstatus: yup.string().trim(),
  personalinfo_placeofbirth: yup.string().trim(),
  personalinfo_registrationnumber: yup
    .number()
    .typeError("Entrez un numéro valide")
    .nullable()
    .moreThan(
      0,
      "Le numéro de registre ne doit pas être inférieur à 1 ou négatif"
    )
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  address_city: yup.string().trim(),
  address_country: yup.string().trim(),
  address_building: yup.string().trim(),
  address_street: yup.string().trim(),
  address_floor: yup.string().trim(),

  email: yup
    .string()
    .trim()
    .email("Entrer un email valide")
    .typeError("Entrer un email valide"),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email("Entrer un email valide")
    .typeError("Entrer un email valide"),
  contactinfo_phonenumber_mobileNumber: yup
    .string("Entrez un numéro de portable valide")
    .typeError("Entrez un numéro de portable valide"),
  contactinfo_phonenumber_landlineNumber: yup
    .string("Enter a valid phone number")
    .nullable()
    .typeError("Entrez un numéro de portable valide"),

  emergencycontact_prefix: yup.string().trim(),
  emergencycontact_firstname: yup.string().trim(),
  emergencycontact_middlename: yup.string().trim(),
  emergencycontact_lastname: yup.string().trim(),
  emergencycontact_relationship: yup.string().trim(),
  emergencycontact_phonenumber: yup
    .string("Veuillez saisir le numéro d'urgence")
    .typeError("Entrez un numéro de téléphone valide")
    .nullable(),
  emergencycontact_medicalhealth: yup.string().trim().nullable(),
  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when("emergencycontact_medicalhealth", {
      is: (value) => value === "Yes",
      then: yup.string().trim(),
    }),

  education_degreelevel: yup.string().trim(),
  education_baccalaureateoption: yup.string().trim(),
  education_yearofacquisition: yup
    .string()
    .trim()
    .nullable()
    .typeError("Veuillez sélectionner l'année"),
  education_institution: yup.string().trim(),
  education_institution_other: yup
    .string()
    .trim()
    .when("education_institution", {
      is: (value) => value === "Autre",
      then: yup.string().trim(),
    }),
  education_country: yup.string().trim(),

  education_schoolgrades_second_math: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_hist: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_geo: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_economie: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_mean: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_second_range: yup
    .string()
    .trim()
    .typeError("Sélectionnez la gamme")
    .nullable(),

  education_schoolgrades_premiere_math: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_hist: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_geo: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_economie: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_mean: yup
    .number()
    .typeError("Entrez un numéro valide")
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .lessThan(20, "La note doit être de 20 ou moins.")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_premiere_range: yup
    .string()
    .trim()
    .typeError("Select Range")
    .nullable(),

  education_schoolgrades_terminale_math: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_hist: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_geo: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_economie: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_mean: yup
    .number()
    .typeError("Entrez un numéro valide")
    .max(20)
    .nullable()
    .moreThan(0, "La note ne doit pas être inférieure à 1 ou négative")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  education_schoolgrades_terminale_range: yup
    .string()
    .trim()
    .typeError("Sélectionnez la gamme.")
    .nullable(),

  education_sat: yup
    .number()
    .typeError("Entrez des points Sat valides.")
    .nullable()
    .moreThan(100, "Les points Sat ne doivent pas être inférieurs à 100")
    .transform((_, val) => (val !== "" ? Number(val) : null)),

  motivationletter: yup.string().trim(),
  source: yup.array().of(yup.string()),
  otherSource: yup.string().trim(),
});
