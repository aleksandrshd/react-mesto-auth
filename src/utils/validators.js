// регулярные выражения
const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const validators = {
  name: {
    empty: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 2;
    },
    maxLength: (value) => {
      return value.length > 40;
    }
  },

  description: {
    empty: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 2;
    },
    maxLength: (value) => {
      return value.length > 200;
    }
  },

  email: {
    isEmail: (value) => {
      return !regexEmail.test(String(value).toLowerCase());
    }
  },

  password: {
    empty: (value) => {
      return value === '';
    },
    minLength: (value) => {
      return value.length < 6;
    }
  },
}

export {validators};