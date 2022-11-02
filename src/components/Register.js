import React, {useState} from "react";
import * as auth from '../auth';
import {Link, useHistory} from "react-router-dom";

export default function Register(props) {

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  function handleInputChange(event) {
    setFormValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('SUBMIT formValues:', formValues);
    auth.register(formValues.password, formValues.email)
      .then((res) => {
        if (res) {
          console.log('Регистрация успешна', res);
          props.openInfoTooltip();
          props.setRegistrationState();
          history.push('/sign-in');
        } else {
          console.log('Регистрация не выполнена');
          props.openInfoTooltip();
        }
      })
  }

  return (
    <form className="login__form"
          onSubmit={handleSubmit}>
      <h2 className="login__header">Регистрация</h2>
      <input className="login__input"
             type="email"
             name="email"
             placeholder="Email"
             minLength="2"
             required
             value={formValues.email}
             onChange={handleInputChange}/>
      <span></span>
      <input className="login__input"
             type="password"
             name="password"
             placeholder="Пароль"
             minLength="6"
             required
             value={formValues.password}
             onChange={handleInputChange}/>
      <span></span>
      <button className="login__button">Зарегистрироваться</button>
      <p className="login__caption">Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link></p>

    </form>

  );
}