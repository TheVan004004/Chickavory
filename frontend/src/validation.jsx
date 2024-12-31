export const validate = (value, validation, check) => {
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

export const validateForm = (form) => {
  let error = new Set();
  form.forEach((feild) => {
    if (typeof feild.value === "string") {
      if (isRequired(feild.value)) {
        error.add(isRequired(feild.value));
      }
    }
    feild.validates.forEach((validate) => {
      if (validate.function(feild.value, validate.check)) {
        error.add(validate.function(feild.value, validate.check));
      }
    });
  });
  return error;
};
export const isRequired = (value) => {
  if (value.trim() === "") return "Please fill all informations. ";
};
export const isConfirmedPassword = (value, valueConfirm) => {
  if (value !== valueConfirm) return "Confirm password is incorrect. ";
};

export const isImagePNG = (file, check) => {
  if (file.type !== "image/png") return "Image is not PNG format. ";
};

export const isPrice = (value, check) => {
  if (value < check) return "Inappropriate pricing. ";
};

export const minChar = (value, min) => {
  if (value.length < min) return `At lease ${min} characters. `;
};

export const minCharPassword = (value, min) => {
  if (value.length < min)
    return `Password must be at least ${min} characters. `;
};
