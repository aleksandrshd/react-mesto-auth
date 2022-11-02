import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import * as auth from '../auth';

export default function Login(props) {

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
    console.log(formValues);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('SUBMIT signIn formValues:', formValues);
    auth.authorize(formValues.password, formValues.email)
      .then((data) => {
        if (data.token) {
          console.log('Вход выполнен', data.token);
          props.handleLogin(true);
          history.push('/main');
        } else {
          console.log('Вход не выполнен');
        }
      })
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <h2 className="login__header">Вход</h2>
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
      <button className="login__button">Войти</button>
    </form>

  );
}