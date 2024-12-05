import bcrypt from "bcryptjs";

const hash = async (input) => {
  try{
  const saltRounds = 10;
  return await bcrypt.hash(input, saltRounds);
}catch(error){
  console.log('this is hash.js in adminApi in admin : ', error)
  return
}
};

export default hash;