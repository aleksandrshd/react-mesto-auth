import React, {useCallback, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {validators} from "../utils/validators";

export default function Register({registrationSuccessful, onRegister}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formDataClicked, setFormDataClicked] = useState({
    email: false,
    password: false
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

    if (formErrors.email.isEmail && formDataClicked.email) {
      setTextEmailError('Введите корректный email')
    } else setTextEmailError('');

    if (formErrors.password.empty && formDataClicked.password) {
      setTextPasswordError('Введите пароль');
    } else if (formErrors.password.minLength && formDataClicked.password) {
      setTextPasswordError('Минимальная длина пароля 6 символов')
    } else setTextPasswordError('');

  }, [formErrors, formDataClicked]);

  const cbChange = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }, [formData]);

  const cbBlur = useCallback((event) => {
    const name = event.target.name;
    setFormDataClicked({
      ...formDataClicked,
      [name]: true
    });
  }, [formDataClicked, formData]);

  const cbSubmit = useCallback((event) => {
    event.preventDefault();
    onRegister(formData.password, formData.email);
  }, [onRegister, formData]);

  if (registrationSuccessful) {
    return <Redirect to="/"/>
  }

  return (
    <form className="login__form"
          onSubmit={cbSubmit}
          noValidate>
      <h2 className="login__header">Регистрация</h2>
      <input className={`login__input ${(formErrors.email.isEmail && (formDataClicked.email || formData.email.length > 0)) ? 'login__input_type_invalid' : ''}`}
             type="email"
             name="email"
             placeholder="Email"
             value={formData.email}
             onChange={cbChange}
             onBlur={cbBlur}/>
      <span className="login__error">{textEmailError}</span>
      <input className={`login__input ${((formErrors.password.empty || formErrors.password.minLength) && (formDataClicked.password || formData.password.length > 0)) ? 'login__input_type_invalid' : ''}`}
             type="password"
             name="password"
             placeholder="Пароль"
             value={formData.password}
             onChange={cbChange}
             onBlur={cbBlur}/>
      <span className="login__error">{textPasswordError}</span>
      <button className="login__button" disabled={isInvalid}>Зарегистрироваться</button>
      <p className="login__caption">Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link></p>
    </form>

  );
}