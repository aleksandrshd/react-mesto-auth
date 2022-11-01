import React from "react";
import { useContext } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="elements__card">
      <button className={`elements__delete-button ${isOwn ? '' : 'elements__delete-button_hidden'}`}
              type="button"
              onClick={handleDeleteClick}/>
      <img className="elements__image"
           src={props.card.link}
           alt={props.card.name}
           onClick={handleClick}/>
      <div className="elements__container">
        <h2 className="elements__title">{props.card.name}</h2>
        <div>
          <button className={`elements__like-button ${isLiked ? 'elements__like-button_type_active' : ''}`}
                  type="button"
                  onClick={handleLikeClick}/>
          <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );

}