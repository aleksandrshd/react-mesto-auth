import React from "react";
import {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithServerError from "./PopupWithServerError";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isServerErrorPopupOpen, setIsServerErrorPopupOpen] = useState(false);
  const [serverError, setSeverError] = useState('');
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.getUserInfo()

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });

  }, []);

  useEffect(() => {

    api.getInitialCards()

      .then(cards => setCards(cards))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });

  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardSel) {
    setSelectedCard(cardSel);
  }

  function handleServerError(err) {
    setSeverError(err);
    setIsServerErrorPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  function closeServerErrorPopupPopup() {
    setIsServerErrorPopupOpen(false);
  }

  function handleUpdateUser(userName, userJob) {

    setIsLoading(true);

    api.setUserInfo(userName, userJob)

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
        console.log(isServerErrorPopupOpen);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(avatarLink) {

    setIsLoading(true);

    api.setUserAvatar(avatarLink)

      .then(userInfo => setСurrentUser(userInfo))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(cardName, cardLink) {
    setIsLoading(true);

    api.setNewCard(cardName, cardLink)

      .then((newCard) => setCards([newCard, ...cards]))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)

      .then((newCard) => {

        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));

      })

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      });

  }

  function handleCardDelete(cardToDelete) {

    setIsLoading(true);

    api.deleteCard(cardToDelete._id)

      .then(() => setCards(cards.filter(cardInitial => cardInitial._id != cardToDelete._id)))

      .catch(err => {
        console.log(`${err}`);
        handleServerError(err);
      })

      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });

  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedToDeleteCard(card);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">

        <Header/>

        <Main onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}/>

        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}/>

        <ConfirmDeleteCardPopup isOpen={isDeleteCardPopupOpen}
                                onClose={closeAllPopups}
                                handleCardDelete={handleCardDelete}
                                selectedToDeleteCard={selectedToDeleteCard}
                                isLoading={isLoading}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        <PopupWithServerError name="server-error" title="Возникла ошибка"
                              isOpen={isServerErrorPopupOpen}
                              onClose={closeServerErrorPopupPopup}
                              serverError={serverError}
                              onClick={closeServerErrorPopupPopup}
                              buttonText='Закрыть'/>

      </div>

    </CurrentUserContext.Provider>
  );
}
