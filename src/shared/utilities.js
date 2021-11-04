export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid === true;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid === true;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid === true;
  }

  if (rules.isEmail) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = re.test(value) && isValid === true;
  }

  return isValid;
};
