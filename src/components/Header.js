import {Link} from "react-router-dom";

export default function Header({userDataAuth, loggedIn, onLogout, enterBtn, registerBtn}) {

  return (
    <header className="header">

      <div className="header__logo"></div>
      {enterBtn && <Link className="header__link" to="/sign-in">Войти</Link> }
      {registerBtn && <Link className="header__link" to="/sign-up">Регистрация</Link> }
      {loggedIn && <div className="header__container">
        <p className="header__paragraph">{userDataAuth.email}</p>
        <button className="header__button"
                onClick={onLogout}>
          Выйти
        </button>
      </div>}

    </header>
  );
}