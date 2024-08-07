export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export const validatePassword = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/.test(password);
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9]{3,}$/;
  return regex.test(username);
};

export const validateName = (name) => {
  const regex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
  return regex.test(name);
};
