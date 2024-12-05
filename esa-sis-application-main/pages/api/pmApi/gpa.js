const gpaToGrades = async (grade) => {
  try{
  let gpa, rank;

  switch (true) {
    case (grade >= 17.0 && grade <= 20.0):
      gpa = 4;
      rank = 'A+';
      break;
    case (grade >= 16.0 && grade <= 16.99):
      gpa = 4;
      rank = 'A';
      break;
    case (grade >= 15.0 && grade <= 15.99):
      gpa = 3.7;
      rank = 'A-';
      break;
    case (grade >= 14.0 && grade <= 14.99):
      gpa = 3.3;
      rank = 'B+';
      break;
    case (grade >= 13.0 && grade <= 13.99):
      gpa = 3.1;
      rank = 'B';
      break;
    case (grade >= 12.5 && grade <= 12.99):
      gpa = 3.0;
      rank = 'B-';
      break;
    case (grade >= 12.0 && grade <= 12.49):
      gpa = 2.7;
      rank = 'C+';
      break;
    case (grade >= 11.5 && grade <= 11.99):
      gpa = 2.3;
      rank = 'C';
      break;
    case (grade >= 11.0 && grade <= 11.49):
      gpa = 2.1;
      rank = 'C-';
      break;
    case (grade >= 10.5 && grade <= 10.99):
      gpa = 2.0;
      rank = 'D+';
      break;
    case (grade >= 10.0 && grade <= 10.49):
      gpa = 1.7;
      rank = 'D';
      break;
    case (grade >= 9.5 && grade <= 9.99):
      gpa = 1.3;
      rank = 'D-/Jury';
      break;
    default:
      gpa = 0;
      rank = 'F';
  }

  return { gpa, rank };
}catch(error){
  console.log('this error in gpa in pmApi : ', error)
}
}
export default gpaToGrades