import React from "react";

import {urlRegExp} from "../utils/constants";

export default function useValidation(value, validations) {

  const [isEmptyError, setIsEmptyError] = React.useState(true);
  const [minLengthError, setMinLengthError] = React.useState(false);
  const [maxLengthError, setMaxLengthError] = React.useState(false);
  const [isUrlError, setIsUrlError] = React.useState(false);
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setIsEmptyError(false) : setIsEmptyError(true);
          break;
        case 'isUrl':
          urlRegExp.test(String(value).toLowerCase()) ? setIsUrlError(false) : setIsUrlError(true);
          break;
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmptyError || minLengthError || maxLengthError || isUrlError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmptyError, minLengthError, maxLengthError, isUrlError])

  return {
    isEmptyError,
    minLengthError,
    maxLengthError,
    isUrlError,
    inputValid
  }
}