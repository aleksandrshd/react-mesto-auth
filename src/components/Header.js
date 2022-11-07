import {Link} from "react-router-dom";

export default function Header({userDataAuth, loggedIn, onLogout, enterBtn, registerBtn}) {
  console.log(userDataAuth);
  return (
    <header className="header">

      <div className="header__logo"></div>
      {enterBtn && <Link style={{color: 'white', textDecoration: 'none'}} to="sign-in">Войти</Link> }
      {registerBtn && <Link style={{color: 'white', textDecoration: 'none'}} to="sign-up">Регистрация</Link> }
      {loggedIn && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
        <p className="header__paragraph">{userDataAuth.email}</p>
        <button className="header__button"
                onClick={onLogout}>
          Выйти
        </button>
      </div>}

    </header>
  );
}