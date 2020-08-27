export const SITE_MESSAGE_VALIDATION = {
  name: {
    presence: { allowEmpty: false },
  },
  // subject: {
  //   type: "string"
  // },
  email: {
    presence: { allowEmpty: false },
    email: true
  },
  message: {
    presence: { allowEmpty: false }
  }
};
