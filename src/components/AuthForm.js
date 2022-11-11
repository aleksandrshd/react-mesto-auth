import React, {useCallback, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {validators, textsOfErrors} from "../utils/validators";

export default function AuthForm({loggedIn, onSubmit, isRegister, registrationSuccessful}) {

  const classNames = require('classnames');

  const [formData, setFormData] = useState({
      email: '',
      password: ''
    }
  );

  const [formDataClicked, setFormDataClicked] = useState({
      email: false,
      password: false
    }
  );

  const [formErrors, setFormErrors] = useState({
    email: {
      isEmail: true
    },
    password: {
      empty: true,
      minLength: true
    }
  });

  const [textEmailError, setTextEmailError] = useState('');
  const [textPasswordError, setTextPasswordError] = useState('');

  const [isInvalid, setIsInvalid] = useState(true);

  useEffect(() => {
    const formKeys = Object.keys(formData);

    const allErrors = formKeys.map(key => {
      const valueByKey = formData[key];
      if (!validators[key]) {
        return {};
      }
      const errors = Object.entries(validators[key]).map(([errorKey, validatorFn]) => {
        return {[errorKey]: validatorFn(valueByKey)};
      }).reduce((acc, item) => ({...acc, ...item}), {});
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
      setTextEmailError(textsOfErrors.email.isEmailTextError);
    } else setTextEmailError('');

    if (formErrors.password.empty && formDataClicked.password) {
      setTextPasswordError(textsOfErrors.password.emptyTextError);
    } else if (formErrors.password.minLength && formDataClicked.password) {
      setTextPasswordError(textsOfErrors.password.minLengthTextError);
    } else setTextPasswordError('');

  }, [formErrors, formDataClicked]);

  const cbChange = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData, [name]: value
    });
  }, [formData]);

  const cbBlur = useCallback((event) => {
    const name = event.target.name;
    setFormDataClicked({
      ...formDataClicked, [name]: true
    });
  }, [formDataClicked, formData]);

  const cbSubmit = useCallback((event) => {
    event.preventDefault();
    onSubmit(formData.password, formData.email);
  }, [onSubmit, formData]);

  if (loggedIn || registrationSuccessful) {
    return <Redirect to="/"/>;
  }

  return (<form className="login__form"
                onSubmit={cbSubmit}
                noValidate>
    <h2 className="login__header">{isRegister ? 'Регистрация' : 'Вход'}</h2>
    <input
      className={
        classNames('login__input',
          {
            login__input_type_invalid:
              (formErrors.email.isEmail && (formDataClicked.email || formData.email.length > 0))
          }
        )
      }
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={cbChange}
      onBlur={cbBlur}/>
    <span className="login__error">{textEmailError}</span>
    <input
      className={
        classNames('login__input',
          {
            login__input_type_invalid:
              ((formErrors.password.empty || formErrors.password.minLength) &&
                (formDataClicked.password || formData.password.length > 0))
          }
        )
      }
      type="password"
      name="password"
      placeholder="Пароль"
      value={formData.password}
      onChange={cbChange}
      onBlur={cbBlur}/>
    <span className="login__error">{textPasswordError}</span>
    <button className="login__button" disabled={isInvalid}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
    {isRegister &&
      <p className="login__caption">Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link>
      </p>}
  </form>);
}