import React, {useCallback, useState} from "react";
import {Redirect} from "react-router-dom";

export default function Login({loggedIn, onLogin}) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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
    <form className="login__form" onSubmit={cbSubmit}>
      <h2 className="login__header">Вход</h2>
      <input className="login__input"
             type="email"
             name="email"
             placeholder="Email"
             minLength="2"
             required
             value={formData.email}
             onChange={cbChange}/>
      <span></span>
      <input className="login__input"
             type="password"
             name="password"
             placeholder="Пароль"
             minLength="6"
             required
             value={formData.password}
             onChange={cbChange}/>
      <span></span>
      <button className="login__button">Войти</button>
    </form>
  );
}