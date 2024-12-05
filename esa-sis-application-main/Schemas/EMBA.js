import * as yup from 'yup';

export const studentInfoSchema_EMBA_en = yup.object().shape({
  personalinfo_title: yup.string().trim().required('Please Select Title'),
  fname: yup.string().trim().required('Please Enter your First Name'),
  personalinfo_fathername: yup
    .string()
    .trim()
    .required("Please Enter your Father's Name"),
  lname: yup.string().trim().required('Please Enter your Last Name'),
  personalinfo_mothernname: yup
    .string()
    .trim()
    .required("Please enter Mother's name"),
  personalinfo_gender: yup.string().trim().required('Please Select Gender'),
  personalinfo_dob: yup
    .string('Enter your date of birth')
    .nullable()
    .required('Please enter Date of birth'),

  personalinfo_countryofbirth: yup
    .string()
    .trim()
    .required('Please select your Country of birth'),
  personalinfo_nationality_firstnationality: yup
    .string()
    .trim()
    .required('Please enter your Nationality'),
  personalinfo_maritalstatus: yup
    .string()
    .trim()
    .required('Please Select Your Marital Status'),
  personalinfo_placeofbirth: yup
    .string()
    .trim()
    .required('Please enter your Place of Birth'),
  personalinfo_registrationnumber: yup
    .number()
    .min('0', 'Register number must be postive')
    .typeError('Enter a valid registration number')
    .required('Please enter your register number'),

  address_country: yup.string().trim().required('Please enter Country'),
  address_city: yup.string().trim().required('Please enter City'),
  address_building: yup.string().trim().required('Please enter Building'),
  address_street: yup.string().trim().required('Please enter Street'),
  address_floor: yup.string().trim().required('Please enter Floor'),

  email: yup
    .string()
    .trim()
    .email('Enter a valid Email')
    .typeError('Enter a valid Email')
    .required('Please enter your Email'),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email('Enter a valid Email')
    .typeError('Enter a valid Email'),
  contactinfo_phonenumber_mobileNumber: yup
    .string('Enter a valid mobile number')
    .typeError('Enter a valid mobile number')
    .required('Please enter a mobile number'),
  contactinfo_phonenumber_landlineNumber: yup
    .string('Enter a valid phone number')
    .nullable()
    .typeError('Enter a valid mobile number'),

  emergencycontact_prefix: yup.string().trim().required('Please Select Prefix'),
  emergencycontact_firstname: yup
    .string()
    .trim()
    .required('Please enter your Emergency Contact First Name'),
  emergencycontact_middlename: yup
    .string()
    .trim()
    .required('Please enter your Emergency Contact Middel Name'),
  emergencycontact_lastname: yup
    .string()
    .trim()
    .required('Please enter your Emergency Contact Last Name'),
  emergencycontact_relationship: yup
    .string()
    .trim()
    .required('Please Select Relationship type'),
  emergencycontact_phonenumber: yup
    .string('Please enter emergency contact number')
    .typeError('Enter a valid Phone Number')
    .required('Please Enter Contact Phone Number'),
  emergencycontact_medicalhealth: yup
    .string()
    .trim()
    .nullable()
    .required('Please Specify Yes or No and if yes provide disease type.'),
  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when('emergencycontact_medicalhealth', {
      is: (value) => value === 'Yes',
      then: yup.string().trim().required('Please Provide disease type.'),
    }),

  education_degreelevel: yup
    .string()
    .trim()
    .required('Please Select Degree Level'),
  education_fieldOfStudy: yup
    .string()
    .trim()
    .required('Please Select Field Of Study'),

  education_OtherFieldOfStudy: yup
    .string()
    .trim()
    .when('education_fieldOfStudy', {
      is: (name) => name === 'Other',
      then: yup.string().trim().required('Enter Field Of Study'),
    }),
  // education_baccalaureateoption: yup
  //   .string()
  //   .trim()
  //   .required('Please Select Baccalaureate'),
  education_yearofacquisition: yup
    .string()
    .trim()
    .typeError('Please Select Year')
    .required('Please Select Acquisition Year'),
  education_institution: yup
    .string()
    .trim()
    .required('Please Select Institute'),
  education_country: yup.string().trim().required('Please Select Country'),
  education_degreeTitle: yup
    .string()
    .trim()
    .required('Please Enter Degree Title'),

  languages_french_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),
  languages_english_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),
  languages_arabic_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),

  languages_other_language: yup
    .string()
    .trim()
    .when('languages_other_proficiency', {
      is: (other) =>
        other === 'Excelent' ||
        other === 'Good' ||
        other === 'Fair' ||
        other === 'Fluent',
      then: yup.string().trim().required('Specify Other Language'),
    }),

  experience_company: yup.string().trim().required('Select Company'),
  experience_otherCompany: yup
    .string()
    .trim()
    .when('experience_company', {
      is: (name) => name === 'Other',
      then: yup.string().trim().required('Enter Company Name'),
    }),
  experience_jobTitle: yup.string().trim().required('Enter Job Title'),
  experience_startDate: yup
    .string()
    .trim()
    .nullable()
    .required('Enter Start Date'),
  experience_directorsName: yup
    .string()
    .trim()
    .required('Enter Directors Name'),
  experience_hrDirectorsName: yup.string().trim(),
  experience_webSite: yup.string().trim(),
  experience_city: yup.string().trim().required('Enter City'),
  experience_building: yup.string().trim(),
  experience_floor: yup.string().trim().required('Enter Floor'),
  experience_street: yup.string().trim().required('Enter Street'),
  experience_region: yup.string().trim(),
  experience_country: yup.string().trim().required('Choose Country'),
  experience_phone: yup.string().trim().required('Enter Phone Number'),
  experience_postal: yup.string().trim(),

  experience_numberOfEmployees: yup
    .number()
    .min('0', 'Employee number must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Employees number')
    .required('Enter Number of Employees'),
  experience_numberOfEmployeesManaged: yup
    .number()
    .min('0', 'Employee number must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Employees number')
    .required('Enter Number of Employeed Managed'),
  experience_turnover: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable(),
  experience_annualIncome: yup
    .number()
    .min('1', 'Annual Income must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Annual Income number')
    .required('Enter anuual Income'),
  experience_monthlySalary: yup
    .number()
    .min('1', 'Monthly Salary must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Monthly Salary number')
    .required('Enter Monthly Salary'),
  experience_workOnSaturday: yup
    .string()
    .trim()
    .nullable()
    .required('Please choose Yes or No'),
  experience_position: yup.string().trim().required('Select Position'),
  experience_functionalArea: yup
    .string()
    .trim()
    .required('Select Functional Area'),
  experience_businessActivity: yup
    .string()
    .trim()
    .required('Select Business Activity'),
  experience_years_totalYears: yup
    .number()
    .min('0', 'Years number must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Year number')
    .required('Enter Years'),
  experience_years_totalMonths: yup
    .number()
    .min('0', 'Months number must be postive')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Month number')
    .required('Enter Months'),

  questions_currentJob: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_otherActivities: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_acheivement: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_reason: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_careerObjectives: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_interests: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  questions_selfDescription: yup
    .string()
    .trim()
    .required('Answer The Required Questions'),
  source: yup.array().of(yup.string()).min(1, 'Please choose your source'),
  otherSource: yup
    .string()
    .trim()
    .when('source', {
      is: (name) => name.includes('Other'),
      then: yup.string().trim().required('Enter Other Source'),
    }),

  payment: yup.string().trim().required('Please choose Payment Method'),
  otherPayment: yup
    .string()
    .trim()
    .when('payment', {
      is: (name) => name === 'Other',
      then: yup.string().trim().required('Enter Payment Method'),
    }),
});

export const studentInfoSchema_EMBA_fr = yup.object().shape({
  personalinfo_title: yup
    .string()
    .trim()
    .required('Veuillez sélectionner le titre'),
  fname: yup.string().trim().required('Please Enter your First Name'),
  personalinfo_fathername: yup
    .string()
    .trim()
    .required('Veuillez entrer le nom de votre père'),
  lname: yup.string().trim().required('Please Enter your Last Name'),
  personalinfo_mothernname: yup
    .string()
    .trim()
    .required('Veuillez entrer le nom de la mère'),

  personalinfo_gender: yup
    .string()
    .trim()
    .required('Veuillez Sélectionner Le Sexe'),

  personalinfo_dob: yup
    .string('Entrez votre date de naissance')
    .nullable()
    .required('Veuillez entrer la date de naissance'),

  personalinfo_countryofbirth: yup
    .string()
    .trim()
    .required('Veuillez sélectionner votre pays de naissance'),
  personalinfo_nationality_firstnationality: yup
    .string()
    .trim()
    .required('Veuillez saisir votre nationalité'),
  personalinfo_maritalstatus: yup
    .string()
    .trim()
    .required('Veuillez sélectionner votre état civil'),
  personalinfo_placeofbirth: yup
    .string()
    .trim()
    .required('Veuillez saisir votre lieu de naissance'),
  personalinfo_registrationnumber: yup
    .number()
    .min('0', 'Le numéro de registre doit être positif')
    .typeError('Entrez un numéro de registre valide')
    .required('Veuillez entrer votre numéro de registre'),

  address_country: yup.string().trim().required('Veuillez saisir le pays'),
  address_city: yup.string().trim().required('Veuillez entrer la ville'),
  address_building: yup.string().trim().required('Veuillez saisir le bâtiment'),
  address_street: yup.string().trim().required('Veuillez entrer la rue'),
  address_floor: yup.string().trim().required('Veuillez saisir l`étage'),

  email: yup
    .string()
    .trim()
    .email('Enter a valid Email')
    .typeError('Enter a valid Email')
    .required('Please enter your Email'),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email('Entrer un email valide')
    .typeError('Entrer un email valide'),
  contactinfo_phonenumber_mobileNumber: yup
    .string('Entrez un numéro de portable valide')
    .typeError('Entrez un numéro de portable valide')
    .required('Veuillez entrer un numéro de portable'),
  contactinfo_phonenumber_landlineNumber: yup
    .string('Entrez un numéro de téléphone valide')
    .nullable()
    .typeError('Entrez un numéro de portable valide'),

  emergencycontact_prefix: yup
    .string()
    .trim()
    .required('Veuillez sélectionner le préfixe'),
  emergencycontact_firstname: yup
    .string()
    .trim()
    .required('Veuillez saisir le prénom de votre contact d`urgence'),
  emergencycontact_middlename: yup
    .string()
    .trim()
    .required('Veuillez entrer votre deuxième prénom de contact d`urgence'),
  emergencycontact_lastname: yup
    .string()
    .trim()
    .required('Veuillez saisir le nom de famille de votre contact d`urgence'),
  emergencycontact_relationship: yup
    .string()
    .trim()
    .required('Veuillez sélectionner le type de relation'),
  emergencycontact_phonenumber: yup
    .string('Veuillez saisir le numéro d`urgence')
    .typeError('Entrez un numéro de téléphone valide')
    .required('Veuillez entrer le numéro de téléphone du contact'),
  emergencycontact_medicalhealth: yup
    .string()
    .trim()
    .nullable()
    .required(
      'Veuillez spécifier Oui ou Non et si oui, indiquez le type de maladie.'
    ),

  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when('emergencycontact_medicalhealth', {
      is: (value) => value === 'Yes',
      then: yup
        .string()
        .trim()
        .required('Veuillez indiquez le type de maladie.'),
    }),

  education_degreelevel: yup
    .string()
    .trim()
    .required('Veuillez sélectionner le niveau de diplôme'),
  education_fieldOfStudy: yup
    .string()
    .trim()
    .required("Veuillez sélectionner le domaine d'études"),

  education_OtherFieldOfStudy: yup
    .string()
    .trim()
    .when('education_fieldOfStudy', {
      is: (name) => name === 'Autre',
      then: yup.string().trim().required("Entrez le domaine d'études"),
    }),
  // education_baccalaureateoption: yup
  //   .string()
  //   .trim()
  //   .required('Veuillez sélectionner Baccalauréat'),
  education_yearofacquisition: yup
    .string()
    .trim()
    .typeError('Veuillez sélectionner l`année')
    .required('Veuillez sélectionner l`année d`acquisition'),
  education_institution: yup
    .string()
    .trim()
    .required('Veuillez sélectionner l`institut'),
  education_country: yup
    .string()
    .trim()
    .required('Veuillez sélectionner le pays'),
  education_degreeTitle: yup
    .string()
    .trim()
    .required('Veuillez entrer le Titre du Diplôme'),

  languages_french_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),
  languages_english_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),
  languages_arabic_proficiency: yup
    .string()
    .oneOf(['Excelent', 'Good', 'Fair', 'Fluent'])
    .required(),
  languages_other_language: yup
    .string()
    .trim()
    .when('languages_other_proficiency', {
      is: (other) =>
        other === 'Excelent' ||
        other === 'Good' ||
        other === 'Fair' ||
        other === 'Fluent',
      then: yup.string().trim().required('Spécifier Une Autre Langue'),
    }),

  experience_company: yup.string().trim().required("Sélectionnez l'Entreprise"),
  experience_otherCompany: yup
    .string()
    .trim()
    .when('experience_company', {
      is: (name) => name === 'Autre',
      then: yup.string().trim().required("Entrez le nom de l'Entreprise"),
    }),
  experience_jobTitle: yup.string().trim().required('Entrez le titre du poste'),
  experience_startDate: yup
    .string()
    .trim()
    .nullable()
    .required('Entrez la date de début'),
  experience_directorsName: yup
    .string()
    .trim()
    .required('Entrez le nom du directeur'),
  experience_hrDirectorsName: yup.string().trim(),
  experience_webSite: yup.string().trim(),
  experience_city: yup.string().trim().required('Entrez la ville'),
  experience_building: yup.string().trim(),
  experience_floor: yup.string().trim().required("Entrez l'étage"),
  experience_street: yup.string().trim().required('Entrez la rue'),
  experience_region: yup.string().trim(),
  experience_country: yup.string().trim().required('Choisissez un pays'),
  experience_phone: yup
    .string()
    .trim()
    .required('Entrez le numéro de téléphone'),
  experience_postal: yup.string().trim(),
  experience_numberOfEmployees: yup
    .number()
    .min('0', "Le numéro d'employé doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'employé valide")
    .required("Entrez le nombre d'employés"),
  experience_numberOfEmployeesManaged: yup
    .number()
    .min('0', "Le numéro d'employé doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'employé valide")
    .required("Entrez le nombre d'employés gérés"),
  experience_turnover: yup
    .number()
    .min('0', "Le chiffre d'affaires doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable(),
  experience_annualIncome: yup
    .number()
    .min('1', 'Le revenu annuel doit être positif')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de revenu annuel valide')
    .required('Entrez le revenu annuel'),
  experience_monthlySalary: yup
    .number()
    .min('1', 'Le salaire mensuel doit être positif')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de salaire mensuel valide')
    .required('Entrez le salaire mensuel'),
  experience_workOnSaturday: yup
    .string()
    .trim()
    .nullable()
    .required('Veuillez choisir Oui ou Non'),
  experience_position: yup.string().trim().required('Sélectionnez le poste'),
  experience_functionalArea: yup
    .string()
    .trim()
    .required('Sélectionnez le domaine fonctionnel'),
  experience_businessActivity: yup
    .string()
    .trim()
    .required("Sélectionnez l'activité commerciale"),
  experience_years_totalYears: yup
    .number()
    .min('0', "Le nombre d'années doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'année valide")
    .required('Entrez les années'),
  experience_years_totalMonths: yup
    .number()
    .min('0', 'Le nombre de mois doit être positif')
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de mois valide')
    .required('Entrez les mois'),

  questions_currentJob: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_otherActivities: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_acheivement: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_reason: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_careerObjectives: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_interests: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),
  questions_selfDescription: yup
    .string()
    .trim()
    .required('Répondez aux Questions Obligatoires'),

  source: yup.array().of(yup.string()).min(1, 'Veuillez choisir votre source'),
  otherSource: yup
    .string()
    .trim()
    .when('source', {
      is: (name) => name.includes('Autre'),
      then: yup.string().trim().required('Entrez la source'),
    }),

  payment: yup.string().trim().required('Veuillez choisir le mode de paiement'),
  otherPayment: yup
    .string()
    .trim()
    .when('payment', {
      is: (name) => name === 'Autre',
      then: yup.string().trim().required('Entrez le mode de Paiement'),
    }),
});

export const studentSaveInfoSchema_EMBA_en = yup.object().shape({
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
    .typeError('Enter a valid number')
    .nullable()
    .moreThan(0, 'Registery Number Must Not Be Less Than 1 or Negative')
    .transform((_, val) => (val !== '' ? Number(val) : null)),

  address_city: yup.string().trim(),
  address_country: yup.string().trim(),
  address_building: yup.string().trim(),
  address_street: yup.string().trim(),
  address_floor: yup.string().trim(),

  email: yup
    .string()
    .trim()
    .email('Enter a valid Email')
    .typeError('Enter a valid Email'),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email('Enter a valid Email')
    .typeError('Enter a valid Email'),
  contactinfo_phonenumber_mobileNumber: yup
    .string('Enter a valid mobile number')
    .typeError('Enter a valid mobile number'),
  contactinfo_phonenumber_landlineNumber: yup
    .string('Enter a valid phone number')
    .nullable()
    .typeError('Enter a valid mobile number'),

  emergencycontact_prefix: yup.string().trim(),
  emergencycontact_firstname: yup.string().trim(),
  emergencycontact_middlename: yup.string().trim(),
  emergencycontact_lastname: yup.string().trim(),
  emergencycontact_relationship: yup.string().trim(),
  emergencycontact_phonenumber: yup
    .string('Please enter emergency contact number')
    .typeError('Enter a valid Phone Number')
    .nullable(),
  emergencycontact_medicalhealth: yup.string().trim().nullable(),

  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when('emergencycontact_medicalhealth', {
      is: (value) => value === 'Yes',
      then: yup.string().trim(),
    }),

  education_degreelevel: yup.string().trim(),
  education_fieldOfStudy: yup.string().trim(),
  education_OtherFieldOfStudy: yup
    .string()
    .trim()
    .when('education_fieldOfStudy', {
      is: (name) => name === 'Other',
      then: yup.string().trim(),
    }),
  // education_baccalaureateoption: yup.string().trim(),
  education_yearofacquisition: yup
    .string()
    .trim()
    .nullable()
    .typeError('Please Select Year'),
  education_institution: yup.string().trim(),
  education_country: yup.string().trim(),
  education_degreeTitle: yup.string().trim(),

  experience_company: yup.string().trim(),
  experience_otherCompany: yup.string().trim(),
  experience_jobTitle: yup.string().trim(),
  experience_startDate: yup.string().trim().nullable(),
  experience_directorsName: yup.string().trim(),
  experience_hrDirectorsName: yup.string().trim(),
  experience_webSite: yup.string().trim(),
  experience_city: yup.string().trim(),
  experience_building: yup.string().trim(),
  experience_floor: yup.string().trim(),
  experience_street: yup.string().trim(),
  experience_region: yup.string().trim(),
  experience_country: yup.string().trim(),
  experience_phone: yup.string().trim(),
  experience_postal: yup.string().trim(),

  experience_numberOfEmployees: yup
    .number()
    .nullable()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .typeError('Enter a valid Employees number'),
  experience_numberOfEmployeesManaged: yup
    .number()
    .nullable()
    .typeError('Enter a valid Employees number')
    .transform((_, val) => (val !== '' ? Number(val) : null)),
  experience_turnover: yup
    .number()
    .nullable()
    .transform((_, val) => (val !== '' ? Number(val) : null)),
  experience_annualIncome: yup
    .number()
    .nullable()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .typeError('Enter a valid Annual Income number'),
  experience_monthlySalary: yup
    .number()
    .nullable()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .typeError('Enter a valid Monthly Salary number'),
  experience_workOnSaturday: yup.string().trim().nullable(),
  experience_position: yup.string().trim(),
  experience_functionalArea: yup.string().trim(),
  experience_businessActivity: yup.string().trim(),
  experience_years_totalYears: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Year number'),
  experience_years_totalMonths: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Enter a valid Month number'),

  questions_currentJob: yup.string().trim(),
  questions_otherActivities: yup.string().trim(),
  questions_acheivement: yup.string().trim(),
  questions_reason: yup.string().trim(),
  questions_careerObjectives: yup.string().trim(),
  questions_interests: yup.string().trim(),
  questions_selfDescription: yup.string().trim(),

  source: yup.array().of(yup.string()),
  otherSource: yup.string().trim(),

  payment: yup.string().trim(),
  otherPayment: yup.string().trim(),
});

export const studentSaveInfoSchema_EMBA_fr = yup.object().shape({
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
    .typeError('Entrez un numéro valide')
    .nullable()
    .moreThan(
      0,
      'Le numéro de registre ne doit pas être inférieur à 1 ou négatif'
    )
    .transform((_, val) => (val !== '' ? Number(val) : null)),

  address_city: yup.string().trim(),
  address_country: yup.string().trim(),
  address_building: yup.string().trim(),
  address_street: yup.string().trim(),
  address_floor: yup.string().trim(),

  email: yup
    .string()
    .trim()
    .email('Entrer un email valide')
    .typeError('Entrer un email valide'),
  contactinfo_email_secondemail: yup
    .string()
    .trim()
    .email('Entrer un email valide')
    .typeError('Entrer un email valide'),
  contactinfo_phonenumber_mobileNumber: yup
    .string('Entrez un numéro de portable valide')
    .typeError('Entrez un numéro de portable valide'),
  contactinfo_phonenumber_landlineNumber: yup
    .string('Enter a valid phone number')
    .nullable()
    .typeError('Entrez un numéro de portable valide'),

  emergencycontact_prefix: yup.string().trim(),
  emergencycontact_firstname: yup.string().trim(),
  emergencycontact_middlename: yup.string().trim(),
  emergencycontact_lastname: yup.string().trim(),
  emergencycontact_relationship: yup.string().trim(),
  emergencycontact_phonenumber: yup
    .string("Veuillez saisir le numéro d'urgence")
    .typeError('Entrez un numéro de téléphone valide')
    .nullable(),
  emergencycontact_medicalhealth: yup.string().trim().nullable(),

  emergencycontact_diseasetype: yup
    .string()
    .trim()
    .when('emergencycontact_medicalhealth', {
      is: (value) => value === 'Yes',
      then: yup.string().trim(),
    }),

  education_degreelevel: yup.string().trim(),
  education_fieldOfStudy: yup.string().trim(),
  education_OtherFieldOfStudy: yup
    .string()
    .trim()
    .when('education_fieldOfStudy', {
      is: (name) => name === 'Autre',
      then: yup.string().trim(),
    }),
  // education_baccalaureateoption: yup.string().trim(),
  education_yearofacquisition: yup
    .string()
    .trim()
    .nullable()
    .typeError("Veuillez sélectionner l'année"),
  education_institution: yup.string().trim(),
  education_country: yup.string().trim(),
  education_degreeTitle: yup.string().trim(),

  experience_company: yup.string().trim(),
  experience_otherCompany: yup.string().trim(),
  experience_jobTitle: yup.string().trim(),
  experience_startDate: yup.string().trim().nullable(),
  experience_directorsName: yup.string().trim(),
  experience_hrDirectorsName: yup.string().trim(),
  experience_webSite: yup.string().trim(),
  experience_city: yup.string().trim(),
  experience_building: yup.string().trim(),
  experience_floor: yup.string().trim(),
  experience_street: yup.string().trim(),
  experience_region: yup.string().trim(),
  experience_country: yup.string().trim(),
  experience_phone: yup.string().trim(),
  experience_postal: yup.string().trim(),
  experience_numberOfEmployees: yup
    .number()
    .min('0', "Le numéro d'employé doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'employé valide"),
  experience_numberOfEmployeesManaged: yup
    .number()
    .min('0', "Le numéro d'employé doit être positif")
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'employé valide"),
  experience_turnover: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable(),
  experience_annualIncome: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de revenu annuel valide'),
  experience_monthlySalary: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de salaire mensuel valide'),
  experience_workOnSaturday: yup.string().trim().nullable(),
  experience_position: yup.string().trim(),
  experience_functionalArea: yup.string().trim(),
  experience_businessActivity: yup.string().trim(),
  experience_years_totalYears: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError("Entrez un numéro d'année valide"),
  experience_years_totalMonths: yup
    .number()
    .transform((_, val) => (val !== '' ? Number(val) : null))
    .nullable()
    .typeError('Entrez un numéro de mois valide'),

  questions_currentJob: yup.string().trim(),
  questions_otherActivities: yup.string().trim(),
  questions_acheivement: yup.string().trim(),
  questions_reason: yup.string().trim(),
  questions_careerObjectives: yup.string().trim(),
  questions_interests: yup.string().trim(),
  questions_selfDescription: yup.string().trim(),

  source: yup.array().of(yup.string()),
  otherSource: yup.string().trim(),
  payment: yup.string().trim(),
  otherPayment: yup.string().trim(),
});
