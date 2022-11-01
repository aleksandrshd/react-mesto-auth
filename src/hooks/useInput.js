import React from "react";
import useValidation from "./useValidation";

export default function useInput(initialValue, validations) {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setDirty] = React.useState(false);

  const valid = useValidation(value, validations);

  function onChange(event) {
    setValue(event.target.value);
  }

  function onBlur(event) {
    setDirty(true);
  }

  function setInputValue (valueToSet) {
    setValue(valueToSet);
  }

  function setDirtyValue (valueToSet) {
    setDirty(valueToSet);
  }

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    setInputValue,
    setDirtyValue,
    ...valid
  }
}