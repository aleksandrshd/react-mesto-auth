import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header({email, loggedIn, handleLogin, currentPathname, handleCurrentPathname}) {

  const history = useHistory();


  function signOut() {
    localStorage.removeItem('jwt');
    handleLogin(false);
    history.push('/sign-in');
  }

  function moveToSignIn () {
    history.push('/sign-in');
    handleCurrentPathname(window.location.pathname);
  }

  function moveToSignUp () {
    history.push('/sign-up');
    handleCurrentPathname(window.location.pathname);
  }

  return (
    <header className="header">

      <div className="header__logo"></div>
      {(currentPathname === '/sign-up') && <button className="header__button" onClick={moveToSignIn}>Войти</button> }
      {(currentPathname === '/sign-in') && <button className="header__button" onClick={moveToSignUp}>Регистрация</button> }
      {loggedIn && <div style={{display: 'flex', flexdirection: 'column', alignItems: 'start'}}>
        <p className="header__paragraph">{email}</p>
        <button className="header__button"
                onClick={signOut}>
          Выйти
        </button>
      </div>}

    </header>
  );
}