const ErrorMessages = {
  userErrors: {
    name: {
      required: 'Name is required.',

      maxLength: 'Name must be 70 characters or less.',

      minLength: 'Name must be 2 characters or more.',

      type: 'Not a valid name.',

      valid: 'Name must be between 2 to 70 characters.',
    },

    email: {
      required: 'Email is required.',

      type: 'Not a valid email',

      valid: 'Not a valid email',
    },

    username: {
      required: 'Username is required.',

      maxLength: 'Username must be 20 characters or less.',

      minLength: 'Username must be 2 characters or more.',

      type: 'Not a valid username.',

      valid: 'Username must be between 2 to 20 characters.',
    },

    photo: {
      required: 'Photo is required.',

      maxLength: 'Photo must be 10MB or less.',

      type: 'Not a valid file.',

      valid: 'Photo should be JPG, JPEG, or PNG.',
    },

    role: {
      required: 'Role is required.',

      type: 'Not a valid role.',

      valid: "Role should either be 'user', 'event-owner', or 'admin'.",
    },

    password: {
      required: 'Password is required.',

      maxLength: 'Password must be 60 characters or less.',

      minLength: 'Password must be 8 characters or more.',

      type: 'Not a valid password.',

      valid:
        'Password must be between 8 to 60 characters long with at least one lowercase, one uppercase, one number, and one symbol.',
    },

    passwordConfirmation: {
      required: 'Password confirmation is required.',

      match: 'Passwords do not match.',

      type: 'Not a valid password confirmation.',
    },

    birthdate: {
      required: 'Birthdate is required.',

      type: 'Not a valid type for birthdate.',
    },

    gender: {
      required: 'Gender is required.',

      valid: "Gender should wither be 'woman', 'male', or 'prefer not to say'.",
    },

    isActive: {
      type: 'Not a valid type for active.',
    },
  },
};

export default Object.freeze(ErrorMessages);
