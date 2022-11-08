import React from "react";
import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Header from "./Header";

export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header userDataAuth={props.userDataAuth}
              loggedIn={props.loggedIn}
              onLogout={props.onLogout}
              enterBtn={false}
              registerBtn={false}/>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar"
               style={{backgroundImage: `url(${currentUser.avatar})`}}
               onClick={props.onEditAvatar}></div>
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button"
                    type="button"
                    onClick={props.onEditProfile}></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__add-button"
                  type="button"
                  onClick={props.onAddPlaceClick}></button>
        </section>
        <section className="elements">
          <ul className="elements__list">

            {props.cards.map(card => {
                return (<Card card={card}
                              key={card._id}
                              onCardClick={props.onCardClick}
                              onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDeleteClick}/>)
              }
            )}
          </ul>
        </section>
      </main>
    </>
  );

}

