import React, {useCallback, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {validators} from "../utils/validators";

export default function Login({loggedIn, onLogin}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: {
      isEmail: true
    },
    password: {
      empty: true,
      minLength: true
    }
  });

  const [isInvalid, setIsInvalid] = useState(true);

  const [textEmailError, setTextEmailError] = useState('');
  const [textPasswordError, setTextPasswordError] = useState('');

  useEffect(() => {
    const formKeys = Object.keys(formData);

    const allErrors = formKeys.map(key => {
      const valueByKey = formData[key];
      if (!validators[key]) {
        return {};
      }
      const errors = Object.entries(validators[key]).map(
        ([errorKey, validatorFn]) => {
          return {[errorKey]: validatorFn(valueByKey)};
        }
      ).reduce((acc, item) => ({...acc, ...item}), {});
      return {[key]: errors};

    }).reduce((acc, item) => ({...acc, ...item}), {});

    setFormErrors(allErrors);

  }, [formData, setFormErrors]);

  useEffect(() => {
    for (const fieldKey in formErrors) {
      const keyErrors = formErrors[fieldKey];
      for (const errorKey in keyErrors) {
        if (keyErrors[errorKey] === true) {
          return setIsInvalid(true);
        }
      }
    }

    setIsInvalid(false);

  }, [formErrors, setIsInvalid]);

  useEffect(() => {

    if (formErrors.email.isEmail) {
      setTextEmailError('Введите корректный email')
    } else setTextEmailError('');

    if (formErrors.password.empty) {
      setTextPasswordError('Введите пароль');
    } else if (formErrors.password.minLength) {
      setTextPasswordError('Минимальная длина пароля 6 символов')
    } else setTextPasswordError('');

  }, [formErrors]);

  const cbChange = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }, [formData]);

  const cbSubmit = useCallback((event) => {
    event.preventDefault();
    onLogin(formData.password, formData.email);
  }, [onLogin, formData]);

  if (loggedIn) {
    return <Redirect to="/"/>;
  }

  return (
    <form className="login__form"
          onSubmit={cbSubmit}
          noValidate>
      <h2 className="login__header">Вход</h2>
      <input className="login__input"
             type="email"
             name="email"
             placeholder="Email"
             value={formData.email}
             onChange={cbChange}/>
      <span className="login__error">{textEmailError}</span>
      <input className="login__input"
             type="password"
             name="password"
             placeholder="Пароль"
             value={formData.password}
             onChange={cbChange}/>
      <span className="login__error">{textPasswordError}</span>
      <button className="login__button" disabled={isInvalid}>Войти</button>
    </form>
  );
}