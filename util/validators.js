module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username cannot be empty';
  }
  if (email.trim() === '') {
    errors.email = 'Email cannot be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Must be a valid email address';
    }
  }
  if (password === '') {
    errors.password = 'Password cannot be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username cannot be empty';
  }
  if (password === '') {
    errors.password = 'Password cannot be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateEditUserInput = (email) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'Email cannot be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
