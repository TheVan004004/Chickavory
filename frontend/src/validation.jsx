const validate = (value, validation, check) => {
  let errorMessage = [];
  validation.forEach((func) => {
    if (func === isConfirmed) {
      const { valueConfirm } = check;
      const error = func(value, valueConfirm);
      if (error) {
        errorMessage.push(error);
      }
    } else if (func === minChar) {
      const { min } = check;
      const error = func(value, min);
      if (error) {
        errorMessage.push(error);
      }
    } else {
      const error = func(value);
      if (error) {
        errorMessage.push(error);
      }
    }
  });
  if (errorMessage[0]) return errorMessage[0];
  else return "";
};

const isRequired = (value) => {
  if (value.trim() === "") return "Please fill all informations. ";
};
const isConfirmed = (value, valueConfirm) => {
  if (value !== valueConfirm) return "Confirm password is incorrect. ";
};

const minChar = (value, min) => {
  if (value.length < min) return `At lease ${min} characters. `;
};
export { validate, isRequired, isConfirmed, minChar };
