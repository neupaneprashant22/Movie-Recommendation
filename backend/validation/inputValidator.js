const validator = require("validator");

const isEmpty = require("./isEmpty");

const inputValidator = (data, type) => {
  // If the user doesn't send any data
  if (isEmpty(data)) {
    return {
      errors: {
        message: "Data validation failed",
      },
      isValid: false,
    };
  }

  let errors = {};

  // Change undefined values to string
  for (const key in data) {
    data[key] = !isEmpty(data[key]) ? data[key] : "";
  }

  // Register user validation
  if (type === "register-user") {
    if (data.email && !validator.isEmail(validator.trim(data.email))) {
      errors.email = "Email is invalid";
    }
    if (
      data.password &&
      !validator.isLength(validator.trim(data.password), { min: 5 })
    ) {
      errors.password = "Password must be at least 6 characters";
    }

    if (
      data.password &&
      data.passwordConfirm &&
      data.password !== data.passwordConfirm
    ) {
      errors.password = "Passwords must be same";
    }
  }

  for (const key in data) {
    if (validator.isEmpty(String(data[key])) && key !== "additionals") {
      let keyText = key.replace(/([a-z])([A-Z])/g, "$1 $2");
      keyText = keyText.charAt(0).toUpperCase() + keyText.slice(1);
      errors[key] = `${keyText} is required`;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = inputValidator;
