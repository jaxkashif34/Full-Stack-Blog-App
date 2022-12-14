import bcrypt from 'bcrypt';
const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };
